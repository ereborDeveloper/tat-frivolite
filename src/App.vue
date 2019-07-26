<template>
    <v-app id="inspire">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Загрузка файла</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Определение границ таблицы</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3">Предварительная обработка данных</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">Импорт данных в БД</v-stepper-step>
            </v-stepper-header>


            <v-stepper-items>
                <v-layout
                        align-center
                        justify-center
                        row
                        fill-height
                >
                    <v-flex
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
                                                    v-model="files"
                                                    label="Выберите файл"
                                                    small-chips
                                                    prepend-icon="mdi-paperclip"
                                                    :display-size="1000"
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
                        <v-card-text></v-card-text>
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
    </v-app>

</template>

<script>

    import ExcelUpload from "@/components/excel/upload";

    export default {
        components: {ExcelUpload},
        props: {
            source: String,
        },
        data: () => ({
            e1: 0,
            files: [],
            drawer: null,
        }),
    }
</script>