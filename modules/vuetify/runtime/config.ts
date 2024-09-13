import { createVuetify } from 'vuetify';
import { VBtn } from 'vuetify/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import {
  VStepperVertical,
  VStepperVerticalActions,
  VStepperVerticalItem,
} from 'vuetify/labs/VStepperVertical';
import { en, vi } from 'vuetify/locale';
import 'vuetify/styles';

export const vuetifyConfig = createVuetify({
  ssr: true,
  locale: {
    locale: 'vi',
    fallback: 'en',
    messages: { vi, en },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {},
  aliases: {
    VCardBtn: VBtn,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        dark: true,
        colors: {},
      },
      light: {
        colors: {},
      },
    },
  },
  components: {
    VStepperVertical,
    VStepperVerticalItem,
    VStepperVerticalActions,
  },
});
