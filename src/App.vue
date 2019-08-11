<template>
    <v-app id="inspire">

        <v-content>
            <v-app-bar
                    app
                    clipped-left
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>tat-frivolite.ru</v-toolbar-title>
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

                    </v-flex>
                </v-layout>

            </v-container>
        </v-content>
    </v-app>

</template>

<script>

    export default {
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

            }
    }
</script>

