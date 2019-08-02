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
                                                    <v-layout>
                                                        <v-expansion-panels>
                                                            <v-expansion-panel>
                                                                <v-expansion-panel-header>Отступы (для небольших
                                                                    таблиц)
                                                                </v-expansion-panel-header>
                                                                <v-expansion-panel-content>
                                                                    <v-layout align-center
                                                                              justify-center>

                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    v-model.number="bounds[index-1].left"
                                                                                    @click="updateTitle(index-1)"
                                                                                    type="number"
                                                                                    label="Отступ слева"
                                                                                    min="0"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    @click="updateTitle(index-1)"
                                                                                    v-model.number="bounds[index-1].top"
                                                                                    type="number"
                                                                                    label="Отступ сверху"
                                                                                    min="0"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    v-model.number="bounds[index-1].right"
                                                                                    @click="updateTitle(index-1)"
                                                                                    type="number"
                                                                                    label="Отступ справа"
                                                                                    min="0"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    @mousedown="updateTitle(index-1)"
                                                                                    v-model.number="bounds[index-1].bottom"
                                                                                    type="number"
                                                                                    label="Отступ снизу"
                                                                                    min="0"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                    </v-layout>

                                                                </v-expansion-panel-content>
                                                            </v-expansion-panel>

                                                            <v-expansion-panel>
                                                                <v-expansion-panel-header>Пропуск колонок и столбцов
                                                                    (через запятую)
                                                                </v-expansion-panel-header>
                                                                <v-expansion-panel-content>
                                                                    <v-layout align-center
                                                                              justify-center>
                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    v-model="skip[index-1].h"
                                                                                    @change="updateHorizontalSkip(index-1)"
                                                                                    label="По горизонтали"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                        <v-flex xs12 sm6 md2>
                                                                            <v-text-field
                                                                                    v-model="skip[index-1].v"
                                                                                    @change="updateVerticalSkip(index-1)"
                                                                                    label="По вертикали"
                                                                            ></v-text-field>
                                                                        </v-flex>
                                                                    </v-layout>

                                                                </v-expansion-panel-content>
                                                            </v-expansion-panel>
                                                        </v-expansion-panels>
                                                    </v-layout>


                                                    <v-layout>
                                                        <v-flex xs12>
                                                            <v-checkbox
                                                                    v-model="titled[index-1]"
                                                                    :label="`Лист содержит заголовок`"
                                                                    @change="updateTitle(index-1)"
                                                            ></v-checkbox>
                                                        </v-flex>
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
                                                                    <tr @click="setTitle(index-1, json[index-1].indexOf(item))">
                                                                        <template
                                                                                v-for="field in headerValues[index-1]">
                                                                            <td :class="getCellStyle(index-1, item, field)">
                                                                                {{item[field]}}
                                                                            </td>
                                                                        </template>
                                                                    </tr>
                                                                </template>
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
                                                        @click="prepareData()"
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
                                        <v-card-text>
                                            <template v-for="index in preparedJson.length">
                                                <v-data-table dense
                                                              :headers="preparedHeaders[index-1]"
                                                              :items="preparedJson[index-1]"
                                                              :items-per-page="25"
                                                              hide-default-header
                                                              class="elevation-1"
                                                >
                                                </v-data-table>
                                            </template>
                                        </v-card-text>
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
            bounds: [],
            skip: [],
            skippedArray: [],

            titleStyle: 'title-style',
            defaultStyle: '',
            disabledStyle: 'disabled-style',

            preparedHeaders: [],
            preparedJson: [],

            drawer: null,
            currentStep: 0
        }),
        methods:
            {
                setTitle(tableIndex, rowIndex) {
                    if (this.titled[tableIndex]) {
                        if (rowIndex >= this.json[tableIndex].length - this.bounds[tableIndex].bottom) {
                            rowIndex = this.json[tableIndex].length - this.bounds[tableIndex].bottom - 1;
                        }
                        this.bounds[tableIndex].top = rowIndex;
                        this.$set(this.titleIndex, tableIndex, rowIndex);
                    }
                },

                getRowIndex(tableIndex, item) {
                    return this.json[tableIndex].indexOf(item);
                },

                getColumnIndex(tableIndex, index) {
                    console.log(index);
                },

                updateTitle(tableIndex) {


                    //TODO: Ограничение максимального ввода

                    if (this.bounds[tableIndex].top > this.json[tableIndex].length) {
                        this.bounds[tableIndex].top = this.json[tableIndex].length;
                    }
                    if (this.bounds[tableIndex].bottom > this.json[tableIndex].length) {
                        this.bounds[tableIndex].bottom = this.json[tableIndex].length;
                    }

                    if (this.bounds[tableIndex].left > this.headers[tableIndex].length) {
                        this.bounds[tableIndex].left = this.headers[tableIndex].length;
                    }

                    if (this.bounds[tableIndex].right > this.headers[tableIndex].length) {
                        this.bounds[tableIndex].right = this.headers[tableIndex].length;
                    }

                    if (this.bounds[tableIndex].top + this.bounds[tableIndex].bottom === this.json[tableIndex].length ||
                        this.bounds[tableIndex].left + this.bounds[tableIndex].right >= this.headers[tableIndex].length) {
                        this.$set(this.titled, tableIndex, false);
                    }

                    this.setTitle(tableIndex, this.bounds[tableIndex].top);
                },

                getCellStyle(tableIndex, item, field) {
                    var rowIndex = this.getRowIndex(tableIndex, item);
                    var colIndex = this.headerValues[tableIndex].indexOf(field);

                    if (rowIndex === this.titleIndex[tableIndex] &&
                        this.titled[tableIndex] &&
                        !(colIndex < this.bounds[tableIndex].left) &&
                        !((this.headerValues[tableIndex].length - this.bounds[tableIndex].right) <= colIndex) &&
                        !(this.skippedArray[tableIndex].h.includes((rowIndex + 1).toString())) &&
                        !this.skippedArray[tableIndex].v.includes((colIndex + 1).toString())
                    ) {
                        return this.titleStyle;
                    }

                    if (colIndex < this.bounds[tableIndex].left ||
                        (this.headerValues[tableIndex].length - this.bounds[tableIndex].right) <= colIndex ||
                        (rowIndex < this.bounds[tableIndex].top) ||
                        (this.json[tableIndex].length - this.bounds[tableIndex].bottom) <= rowIndex ||
                        this.skippedArray[tableIndex].h.includes((rowIndex + 1).toString()) ||
                        this.skippedArray[tableIndex].v.includes((colIndex + 1).toString())
                    ) {
                        return this.disabledStyle;
                    } else {
                        return this.defaultStyle;
                    }
                },
                updateHorizontalSkip(tableIndex) {
                    this.skippedArray[tableIndex].h = this.skip[tableIndex].h.replace(/\s/g, '').split(",");
                },
                updateVerticalSkip(tableIndex) {
                    this.skippedArray[tableIndex].v = this.skip[tableIndex].v.replace(/\s/g, '').split(",");
                },
                prepareData() {
                    this.preparedHeaders = [];
                    this.preparedJson = [];

                    this.currentStep = 3;
                    console.log(this.json.length);
                    this.preparedHeaders = this.headers;

                    for (var tableIndex in this.json) {
                        this.preparedJson.push([]);
                        for (var i in this.json[tableIndex]) {
                            if (i >= this.bounds[tableIndex].top &&
                                i < this.json[tableIndex].length - this.bounds[tableIndex].bottom) {
                                this.preparedJson[tableIndex].push(this.json[tableIndex][i])
                            }
                        }
                    }
                }
            }
    }
</script>

<style>

    .title-style {
        background: linear-gradient(to top, #fff -20%, #82B1FF 100%);
        background-size: 100% 200%;
        color: #fff;
        transition: transition 0.5s ease, opacity 0.5s ease;
        animation-name: title;
        animation-duration: 0.2s;
        animation-timing-function: ease-in-out;
        animation-play-state: running;

        -webkit-animation-name: title;
        -webkit-animation-duration: 0.2s;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-play-state: running;
    }

    @-webkit-keyframes title {
        0% {
            color: #000;
            background-color: #fff;
            background-position-y: 100%;
        }
        100.0% {
            color: #fff;
            background-color: #82B1FF;
            background-position-y: 20%;
        }
    }

    @keyframes title {
        0% {
            background-color: #fff;
            background-position-y: 100%;
        }
        100.0% {
            background-color: #82B1FF;
            background-position-y: 0%;
        }
    }

    .disabled-style {
        background: #EEEEEE;
        color: #999;
        background-size: 400% 400%;
        transition: transition 0.5s ease, opacity 0.5s ease;
        animation-name: disabled;
        animation-duration: 0.5s;
        animation-timing-function: ease-in;
        animation-play-state: running;

        -webkit-animation-name: disabled;
        -webkit-animation-duration: 0.5s;
        -webkit-animation-timing-function: ease-in;
        -webkit-animation-play-state: running;
    }

    @-webkit-keyframes disabled {
        0% {
            background-color: #fff;
        }
        100.0% {
            background-color: #EEEEEE;
        }
    }

    @keyframes disabled {
        0% {
            background-color: #fff;
        }
        100.0% {
            background-color: #EEEEEE;
        }
    }
</style>