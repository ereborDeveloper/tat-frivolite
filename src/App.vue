<template>
    <v-app id="inspire">
        <v-content>
            <v-app-bar
                    app
                    clipped-left
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Статус: {{status}}</v-toolbar-title>
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
                                                            <v-file-input
                                                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
                                                                    v-model="file"
                                                                    label="Выберите файл"
                                                                    small-chips
                                                                    prepend-icon="mdi-paperclip"
                                                                    :display-size="1000"
                                                                    @change="uploadFile"
                                                            >
                                                            </v-file-input>
                                                        </template>
                                                    </v-form>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-layout
                                                            align-center
                                                            justify-center
                                                    >
                                                        <v-btn color="primary"
                                                               @click="e1 = 2">Продолжить
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
            json: null,
            status: "",
            e1: 0,
            file: null,
            drawer: null,
        }),
        methods:
            {
                uploadFile: function () {
                    this.status = "loaded";

                    var reader = new FileReader();
                    reader.readAsArrayBuffer(this.file);

                    reader.onload = function (e) {
                        var data = new Uint8Array(reader.result);
                        // var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'array',
                            codepage: "utf8"
                        });

                        var sheetNames = workbook.SheetNames;

                        var activeSheet;

                        if (sheetNames.length === 1) {
                            activeSheet = sheetNames[0];
                        } else {

                        }

                        var json = XLSX.utils.sheet_to_json(workbook.Sheets["mrt"], {raw: true, defval: null});

                        console.log(json);

                        // $('#wrapper')[0].innerHTML += htmlstr;

                        // workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object
                        // var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        // var json_object = JSON.stringify(XL_row_object);
                        // console.log(JSON.parse(json_object));

                        // })

                    };

                    reader.onerror = function (ex) {
                        console.log(ex);
                    };

                }
            }
    }
</script>