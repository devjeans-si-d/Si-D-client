import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'
import colors from 'vuetify/util/colors'
import { mdi } from 'vuetify/iconsets/mdi'; // mdi 이모지

export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.green.darken1, // #4CAF5
                    secondary: colors.green.lighten4, // #C8E6C
                    deep: colors.green.darken4,
                    sid_green: "#E6FFE3",
                    sid_btn1: "#A4DEC6",
                    sid_btn2: "094F08"
                }
            },
        },
    },  
    icons: {
    defaultSet: 'mdi',
    sets: {
        mdi,
    }
    },
    
});