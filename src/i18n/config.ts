import i18n from "i18next";                      
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export const supportedLanguages = {
    en: "English",
    de: "Deutsch",
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        // Config options

        // Specifies the default language (locale) used
        // when a user visits our site for the first time.            
        // lng: "en",

        // Fallback locale used when a translation is
        // missing in the active locale.
        fallbackLng: "en",

        // Explicitly tell i18next our
        // supported locales.
        supportedLngs: Object.keys(supportedLanguages),

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn 
        // it off in i18next.
        interpolation: {
        escapeValue: false,
        },

        resources: {
            en: {
                translation: {
                    intro: "Get to know all the chemical elements from a new perspective with this interactive 3D application. We break the rigid structure of the periodic table to present the important properties in new ways using the 3D space.",
                    buttons: {
                        run: 'Go'
                    },
                },
            },
            de: {
                translation: {
                    intro: "Lernen Sie mit dieser interaktiven 3D-Anwendung alle chemischen Elemente aus einer neuen Perspektive kennen. Wir brechen die starre Struktur des Periodensystems auf, um die wichtigen Eigenschaften auf neue Weise im 3D-Raum darzustellen.",
                    buttons: {
                        run: 'Start'
                    },
                },
            },
        },
    });

export default i18n;