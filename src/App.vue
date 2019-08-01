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
                                                        <v-flex xs12 sm6 md2>
                                                            <v-text-field v-model.number="bounds[index-1].left"
                                                                          @click="updateTitle(index-1)"
                                                                          type="number"
                                                                          label="Отступ слева"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12 sm6 md2>
                                                            <v-text-field @click="updateTitle(index-1)"
                                                                          v-model.number="bounds[index-1].top"
                                                                          type="number"
                                                                          label="Отступ сверху"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12 sm6 md2>
                                                            <v-text-field v-model.number="bounds[index-1].right"
                                                                          @click="updateTitle(index-1)"
                                                                          type="number"
                                                                          label="Отступ справа"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12 sm6 md2>
                                                            <v-text-field @mousedown="updateTitle(index-1)"
                                                                          v-model.number="bounds[index-1].bottom"
                                                                          type="number"
                                                                          label="Отступ снизу"
                                                            ></v-text-field>
                                                        </v-flex>
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
            bounds: [],

            titleColor: 'blue lighten-3',
            blankColor: '#fff',
            disabledColor: 'pink lighten-4',

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
                    var rowIndex = this.json[tableIndex].indexOf(item);
                    return rowIndex;
                },

                getColumnIndex(tableIndex, index) {
                    console.log(index);
                },

                updateTitle(tableIndex) {
                    console.log(this.headers[tableIndex].length);
                    console.log(this.bounds[tableIndex].left + this.bounds[tableIndex].right);
                    if (this.bounds[tableIndex].top + this.bounds[tableIndex].bottom >= this.json[tableIndex].length ||
                        this.bounds[tableIndex].left + this.bounds[tableIndex].right >= this.headers[tableIndex].length) {
                        this.$set(this.titled, tableIndex, false);
                    }
                    this.setTitle(tableIndex, this.bounds[tableIndex].top);
                },

                getCellStyle(tableIndex, item, field) {
                    var rowIndex = this.getRowIndex(tableIndex, item);
                    var colIndex = this.headerValues[tableIndex].indexOf(field);

                    if (rowIndex === this.titleIndex[tableIndex] && this.titled[tableIndex] && !(colIndex < this.bounds[tableIndex].left) && !((this.headerValues[tableIndex].length - this.bounds[tableIndex].right) <= colIndex)) {
                        return this.titleColor;
                    }

                    if (colIndex < this.bounds[tableIndex].left ||
                        (this.headerValues[tableIndex].length - this.bounds[tableIndex].right) <= colIndex ||
                        (rowIndex < this.bounds[tableIndex].top) ||
                        (this.json[tableIndex].length - this.bounds[tableIndex].bottom) <= rowIndex
                    ) {
                        return this.disabledColor;
                    } else {
                        return this.blankColor;
                    }
                }
            }
    }
</script>