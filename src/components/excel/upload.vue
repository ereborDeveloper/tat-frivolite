<template>
    <div id="excelUpload">

        <v-card>
            <v-toolbar
                    color=""
                    flat
            >
                <v-layout
                        align-center
                        justify-center
                >
                    <v-toolbar-title>Импорт Excel</v-toolbar-title>
                </v-layout>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-form>

                    <template>
                        <v-container grid-list-md>
                            <v-layout align-center
                                      justify-center>
                                <v-flex xs12>
                                    <v-file-input
                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
                                            v-model="file"
                                            label="Выберите файл"
                                            small-chips
                                            prepend-icon="mdi-paperclip"
                                            :display-size="1000"
                                            @change="getSheets"
                                    >
                                    </v-file-input>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </template>
                    <template>
                        <v-container fluid>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-combobox
                                            v-model="sheetsToImport"
                                            :items="sheets"
                                            label="Выберите листы для импорта"
                                            multiple
                                    ></v-combobox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </template>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-layout
                        align-center
                        justify-center
                >
                    <v-btn color="primary" :disabled="!loaded"
                           v-on:click="uploadSheet">Продолжить
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        <template>
            <v-snackbar
                    v-model="snackbar"
                    :timeout="500"
            >
                Загрузка листов
                <v-progress-circular indeterminate buffer-value="40"></v-progress-circular>
            </v-snackbar>
        </template>
    </div>
</template>

<script>
    import XLSX from 'xlsx';

    export default {
        props: ['state'],
        name: "excelUpload",
        data: () => ({
            file: null,

            wb: null,

            sheets: [],
            sheetsToImport: [],

            loading: false,
            snackbar: false,
            loaded: false
        }),
        methods: {
            getSheets() {
                if (this.file === null) {
                    this.sheets = [];
                    this.sheetsToImport = [];
                    this.loading = false;
                    this.loaded = false;
                } else {
                    if (!this.loaded) {
                        this.snackbar = true;
                        this.loading = true;
                        var self = this;

                        var reader = new FileReader();
                        reader.onload = evt => {
                            const data = evt.target.result;
                            self.wb = XLSX.read(data, {type: "binary"});
                            self.sheets = self.wb.SheetNames;
                            self.sheetsToImport = self.wb.SheetNames;
                        };
                        setTimeout(function () {
                            reader.readAsBinaryString(self.file);
                        }, self.file.size / 40000);

                        reader.onerror = function (ex) {
                            console.log(ex);
                        };
                        this.loaded = true;
                    }
                }
            },
            uploadSheet() {
                this.state.headers = [];
                this.state.headerValues = [];
                this.state.json = [];
                this.state.currentStep = 2;
                for (var sheetIndex in this.sheetsToImport) {
                    var sheetName = this.sheetsToImport[sheetIndex];
                    var j = XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName], {header: "A", defval: ""});
                    var keys = Object.keys(j[0]);
                    var header = [];
                    for (var i in keys) {
                        header.push({text: keys[i], value: keys[i]});
                    }
                    this.state.titled.push(false);
                    this.state.titleIndex.push(-1);
                    this.state.headerValues = keys;
                    this.state.headers.push(header);
                    this.state.json.push(j);
                }
            }
        },
    }
</script>

<style scoped>

</style>