import { Color } from './types';

export const Constants = {
    Paths: {
        Assets: {
            logo: "/assets/images/logo.png",
            firma: "/assets/images/firma.png",
        },
        Config: {
            vehicleData: "/src/data/vehicleData.ts",
        }
    },

    GUI: {
        navigationTitle: "Cotizaciones Repuestos Oyarce",
        Tabs: {
            cotizacion: "Cotización",
            historial: "Historial"
        },
        Icons: {
            cotizacion: "doc.text.fill",
            historial: "clock.fill"
        },
        duracionOptions: [
            "1 día", "2 días", "3 días", "4 días", "5 días",
            "6 días", "7 días", "10 días", "14 días", "21 días",
            "28 días", "30 días", "60 días",
        ]
    },

    App: {
        minimumVersion: "1.0.0",
        Colors: {
            primary: "#007AFF",
            secondary: "#5856D6",
            background: "#FFFFFF",
            text: "#000000"
        } as Record<string, Color>,
        UI: {
            cornerRadius: 10,
            buttonHeight: 44,
            standardPadding: 16
        }
    },

    Cache: {
        cotizacionesKey: "cotizaciones",
        cacheExpirationHours: 24
    },

    PDF: {
        defaultFileName: "Cotizacion",
        fileExtension: "pdf",
        mimeType: "application/pdf",
        pageWidth: 612.0, // Standard A4 width in points
        pageHeight: 792.0, // Standard A4 height in points
        margin: 20.0,

        Layout: {
            logoSize: { width: 926, height: 272 },
            firmaSize: { width: 110, height: 110 },
            columnWidths: [250, 80, 120, 120]
        },

        Margins: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
        },

        Fonts: {
            title: "Helvetica-Bold",
            normal: "Helvetica",
            titleSize: 24,
            normalSize: 12
        },

        TableColumns: {
            client: {
                labelWidth: "20%",
                valueWidth: "80%"
            },
            products: {
                product: "40%",
                quantity: "20%",
                price: "20%",
                total: "20%"
            }
        },

        Styles: {
            verticalPadding: 10.0,
            titleBottomSpacing: 30.0,
            signatureTopSpacing: 40.0
        },

        TableHeaders: {
            products: ["Producto", "Cantidad", "Precio", "Total"],
            client: ["Cliente", "Fecha", "Marca", "Modelo", "Duración"],
            optionalClient: ["Año", "Patente", "Disponibilidad"]
        },

        Colors: {
            headerBackground: "#F2F2F2",
            labelBackground: "#F7F7F7",
            border: "#000000"
        } as Record<string, Color>,

        MonetaryFormat: {
            currencySymbol: "$",
            thousandsSeparator: ".",
            decimalPlaces: 0,
            locale: "es-CL",
        }
    },

    YearPicker: {
        startYear: new Date().getFullYear() + 1,
        numberOfYears: 30,
        get years(): string[] {
            const startYear = this.startYear;
            return Array.from(
                { length: this.numberOfYears }, 
                (_, i) => String(startYear - i)
            );
        }
    }
} as const;
