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
                        <v-stepper v-model="currentStep">
                            <v-stepper-header>
                                <v-stepper-step :complete="currentStep > 1" step="1">Загрузка файла</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="currentStep > 2" step="2">Определение границ таблицы
                                </v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="currentStep > 3" step="3">Предварительная обработка данных
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
                                            <excel-upload v-bind:state="this"></excel-upload>
                                        </v-stepper-content>
                                    </v-flex>
                                </v-layout>
                                <v-stepper-content step="2">
                                    <v-card>
                                        <v-card-title></v-card-title>
                                        <v-card-text>
                                            <template v-for="index in json.length">
                                                <v-container grid-list-md>
                                                    <v-layout align-center
                                                              justify-center>
                                                        <v-checkbox
                                                                v-model="titled[index-1]"
                                                                :label="`Лист содержит заголовок`"
                                                        ></v-checkbox>
                                                    </v-layout>
                                                    <v-layout align-center
                                                              justify-center>
                                                        <v-flex xs12>
                                                            <v-data-table dense
                                                                          :headers="headers[index-1]"
                                                                          :items="json[index-1]"
                                                                          :items-per-page="25"
                                                                          hide-default-header
                                                                          class="elevation-1"
                                                            >
                                                                <template v-slot:item="{item}">

                                                                    <tr @click="chooseTitle(item)"
                                                                        v-bind:class="isTitle(item)">
                                                                        <template v-for="value in headerValues">
                                                                            <td>{{item[value]}}</td>
                                                                        </template>
                                                                    </tr>
                                                                </template>

                                                                <!--<template v-for="head in headers">

                                                                <template v-slot:[head]="{ item  }">
                                                                    <v-chip :color="red" dark>{{ item.A }}</v-chip>
                                                                </template>
                                                                </template>-->
                                                            </v-data-table>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </template>

                                        </v-card-text>
                                        <v-card-actions>
                                            <v-layout
                                                    align-center
                                                    justify-center
                                            >
                                                <v-btn
                                                        color="primary"
                                                        @click="currentStep = 3"
                                                >
                                                    Продолжить
                                                </v-btn>
                                                <v-btn @click="currentStep = 1" text>Отмена</v-btn>
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
                                                        @click="currentStep = 4"
                                                >
                                                    Продолжить
                                                </v-btn>
                                                <v-btn @click="currentStep = 2" text>Назад</v-btn>
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
                                                <v-btn @click="currentStep = 3" text>Назад</v-btn>
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


    export default {
        components: {ExcelUpload},
        props: {
            source: String,
        },
        data: () => ({
            headers: [],
            headerValues: [],
            json: [],
            titled: [],

            titleIndex: [],

            drawer: null,
            currentStep: 0
        }),
        methods:
            {
                chooseTitle(item) {
                    if (this.titled[0]) {
                        // Пока что для первой таблицы
                        var index = this.json[0].indexOf(item);
                        this.titleIndex[0] = index;
                        console.log(index);
                    }
                }
            },
        computed:
            {
                isTitle(item) {
                    console.log("He" + this.json[0].indexOf(item));
                    if (this.json[0].indexOf(item) === this.titled[0]) {
                        return {background: '#777'};
                    } else {
                        return {background: '#fff'};
                    }
                }
            }
    }
</script>