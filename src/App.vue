<template>
    <v-app id="inspire">

        <v-content>
            <v-app-bar
                    app
                    clipped-left
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Импорт Excel</v-toolbar-title>
            </v-app-bar>


            <v-container fluid fill-height>
                <v-layout
                        align-top
                        justify-center
                >
                    <v-flex
                            xs12
                            sm12
                            md12
                    >
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <v-stepper-step :complete="e1 > 1" step="1">Загрузка файла</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="e1 > 2" step="2">Определение границ таблицы</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="e1 > 3" step="3">Предварительная обработка данных
                                </v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="4">Импорт данных в БД</v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                                <v-layout
                                        align-center
                                        justify-center
                                >
                                    <v-flex
                                            xs12
                                            sm8
                                            md4
                                    >
                                        <v-stepper-content step="1">
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
                                                        <v-btn color="primary"
                                                               @click="uploadSheet">Продолжить
                                                        </v-btn>
                                                    </v-layout>
                                                </v-card-actions>
                                            </v-card>
                                        </v-stepper-content>
                                    </v-flex>
                                </v-layout>
                                <v-stepper-content step="2">
                                    <v-card>
                                        <v-card-title></v-card-title>
                                        <v-card-text>

                                        </v-card-text>
                                        <v-card-actions>
                                            <v-layout
                                                    align-center
                                                    justify-center
                                            >
                                                <v-btn
                                                        color="primary"
                                                        @click="e1 = 3"
                                                >
                                                    Продолжить
                                                </v-btn>
                                                <v-btn @click="e1 = 1" text>Отмена</v-btn>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content step="3">
                                    <v-card>
                                        <v-card-title></v-card-title>
                                        <v-card-text></v-card-text>
                                        <v-card-actions>
                                            <v-layout
                                                    align-center
                                                    justify-center
                                            >
                                                <v-btn
                                                        color="primary"
                                                        @click="e1 = 4"
                                                >
                                                    Продолжить
                                                </v-btn>
                                                <v-btn @click="e1 = 2" text>Назад</v-btn>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>
                                <v-stepper-content step="4">
                                    <v-card>
                                        <v-card-title></v-card-title>
                                        <v-card-text></v-card-text>
                                        <v-card-actions>
                                            <v-layout
                                                    align-center
                                                    justify-center
                                            >
                                                <v-btn
                                                        color="primary"
                                                >
                                                    Импорт
                                                </v-btn>
                                                <v-btn @click="e1 = 3" text>Назад</v-btn>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-flex>
                </v-layout>
                <template>
                    <v-snackbar
                            v-model="snackbar"
                            :timeout="500"
                    >
                        Загрузка листов
                        <v-progress-circular indeterminate buffer-value="40"></v-progress-circular>
                    </v-snackbar>
                </template>
            </v-container>
        </v-content>
    </v-app>

</template>

<script>

    import ExcelUpload from "@/components/excel/upload";
    import XLSX from 'xlsx';

    export default {
        components: {ExcelUpload},
        props: {
            source: String,
        },
        data: () => ({
            file: null,

            wb: null,

            sheets: [],
            sheetsToImport: [],

            json: null,

            loading: false,
            snackbar: false,

            drawer: null,
            e1: 0
        }),
        methods:
            {
                getSheets: function () {
                    if (this.file === null) {
                        this.sheets = [];
                        this.sheetsToImport = [];
                        this.loading = false;
                    } else {
                        if (this.sheets.length === 0) {
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
                        }
                    }

                },
                uploadSheet: function () {
                    this.e1 = 2;
                    for (var sheetIndex in this.sheetsToImport) {
                        var sheetName = this.sheetsToImport[sheetIndex];
                        const json = XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName], {header: "A", defval: ""});
                        console.log(json);
                    }
                }
            }
    }
</script>