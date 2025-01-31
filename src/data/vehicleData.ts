import { VehicleBrand, VehicleModel } from '../utils/types';

export interface VehicleModel {
  id: string;
  name: string;
  years?: string[];
}

export interface VehicleBrand {
  id: string;
  name: string;
  models: VehicleModel[];
}

export const vehicleBrands: VehicleBrand[] = [
{
  "id": "audi",
  "name": "Audi",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "a1",
      "name": "A1"
    },
    {
      "id": "a3",
      "name": "A3"
    },
    {
      "id": "a4",
      "name": "A4"
    },
    {
      "id": "a5",
      "name": "A5"
    },
    {
      "id": "a6",
      "name": "A6"
    },
    {
      "id": "a7",
      "name": "A7"
    },
    {
      "id": "a8",
      "name": "A8"
    },
    {
      "id": "e-tron",
      "name": "e-tron"
    },
    {
      "id": "q2",
      "name": "Q2"
    },
    {
      "id": "q3",
      "name": "Q3"
    },
    {
      "id": "q4",
      "name": "Q4"
    },
    {
      "id": "q5",
      "name": "Q5"
    },
    {
      "id": "q7",
      "name": "Q7"
    },
    {
      "id": "q8",
      "name": "Q8"
    },
    {
      "id": "r8",
      "name": "R8"
    },
    {
      "id": "rs-q3",
      "name": "RS Q3"
    },
    {
      "id": "rs-q8",
      "name": "RS Q8"
    },
    {
      "id": "rs3",
      "name": "RS3"
    },
    {
      "id": "rs4",
      "name": "RS4"
    },
    {
      "id": "rs5",
      "name": "RS5"
    },
    {
      "id": "rs6",
      "name": "RS6"
    },
    {
      "id": "rs7",
      "name": "RS7"
    },
    {
      "id": "s3",
      "name": "S3"
    }
  ]
},
{
  "id": "bmw",
  "name": "BMW",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "1-series",
      "name": "1 Series"
    },
    {
      "id": "2-series",
      "name": "2 Series"
    },
    {
      "id": "3-series",
      "name": "3 Series"
    },
    {
      "id": "4-series",
      "name": "4 Series"
    },
    {
      "id": "5-series",
      "name": "5 Series"
    },
    {
      "id": "6-series",
      "name": "6 Series"
    },
    {
      "id": "7-series",
      "name": "7 Series"
    },
    {
      "id": "8-series",
      "name": "8 Series"
    },
    {
      "id": "i3",
      "name": "i3"
    },
    {
      "id": "i4",
      "name": "i4"
    },
    {
      "id": "i7",
      "name": "i7"
    },
    {
      "id": "i8",
      "name": "i8"
    },
    {
      "id": "ix",
      "name": "iX"
    },
    {
      "id": "m2",
      "name": "M2"
    },
    {
      "id": "m3",
      "name": "M3"
    },
    {
      "id": "m4",
      "name": "M4"
    },
    {
      "id": "m5",
      "name": "M5"
    },
    {
      "id": "m6",
      "name": "M6"
    },
    {
      "id": "m8",
      "name": "M8"
    },
    {
      "id": "x1",
      "name": "X1"
    },
    {
      "id": "x2",
      "name": "X2"
    },
    {
      "id": "x3",
      "name": "X3"
    },
    {
      "id": "x4",
      "name": "X4"
    }
  ]
},
{
  "id": "chery",
  "name": "Chery",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "arrizo",
      "name": "Arrizo"
    },
    {
      "id": "fulwin",
      "name": "Fulwin"
    },
    {
      "id": "qq",
      "name": "QQ"
    },
    {
      "id": "tiggo",
      "name": "Tiggo"
    },
    {
      "id": "tiggo-2",
      "name": "Tiggo 2"
    },
    {
      "id": "tiggo-3",
      "name": "Tiggo 3"
    },
    {
      "id": "tiggo-4",
      "name": "Tiggo 4"
    },
    {
      "id": "tiggo-5",
      "name": "Tiggo 5"
    },
    {
      "id": "tiggo-5x",
      "name": "Tiggo 5x"
    },
    {
      "id": "tiggo-6",
      "name": "Tiggo 6"
    },
    {
      "id": "tiggo-7",
      "name": "Tiggo 7"
    },
    {
      "id": "tiggo-7-pro",
      "name": "Tiggo 7 Pro"
    },
    {
      "id": "tiggo-8",
      "name": "Tiggo 8"
    },
    {
      "id": "tiggo-8-pro",
      "name": "Tiggo 8 Pro"
    }
  ]
},
{
  "id": "chevrolet",
  "name": "Chevrolet",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "aveo",
      "name": "Aveo"
    },
    {
      "id": "blazer",
      "name": "Blazer"
    },
    {
      "id": "camaro",
      "name": "Camaro"
    },
    {
      "id": "camaro-2023",
      "name": "Camaro 2023"
    },
    {
      "id": "captiva",
      "name": "Captiva"
    },
    {
      "id": "captiva-2.2",
      "name": "Captiva 2.2"
    },
    {
      "id": "cavalier",
      "name": "Cavalier"
    },
    {
      "id": "cheyenne",
      "name": "Cheyenne"
    },
    {
      "id": "colorado",
      "name": "Colorado"
    },
    {
      "id": "corsa",
      "name": "Corsa"
    },
    {
      "id": "corvette",
      "name": "Corvette"
    },
    {
      "id": "cruze",
      "name": "Cruze"
    },
    {
      "id": "cruze-1.8",
      "name": "Cruze 1.8"
    },
    {
      "id": "d-max",
      "name": "D-Max"
    },
    {
      "id": "dmax-2014",
      "name": "Dmax 2014"
    },
    {
      "id": "equinox",
      "name": "Equinox"
    },
    {
      "id": "joy",
      "name": "Joy"
    },
    {
      "id": "montana",
      "name": "Montana"
    },
    {
      "id": "n300",
      "name": "N300"
    },
    {
      "id": "onix",
      "name": "Onix"
    },
    {
      "id": "orlando",
      "name": "Orlando"
    },
    {
      "id": "s10",
      "name": "S10"
    },
    {
      "id": "sail",
      "name": "Sail"
    }
  ]
},
{
  "id": "dfm",
  "name": "DFM",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "370",
      "name": "370"
    },
    {
      "id": "580",
      "name": "580"
    },
    {
      "id": "ax7",
      "name": "AX7"
    },
    {
      "id": "dfa",
      "name": "DFA"
    },
    {
      "id": "dfm-mini",
      "name": "DFM Mini"
    },
    {
      "id": "dongfeng",
      "name": "Dongfeng"
    }
  ]
},
{
  "id": "dodge",
  "name": "Dodge",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "challenger",
      "name": "Challenger"
    },
    {
      "id": "charger",
      "name": "Charger"
    },
    {
      "id": "dart",
      "name": "Dart"
    },
    {
      "id": "durango",
      "name": "Durango"
    },
    {
      "id": "journey",
      "name": "Journey"
    },
    {
      "id": "magnum",
      "name": "Magnum"
    },
    {
      "id": "neon",
      "name": "Neon"
    },
    {
      "id": "nitro",
      "name": "Nitro"
    },
    {
      "id": "ram",
      "name": "RAM"
    },
    {
      "id": "spirit",
      "name": "Spirit"
    },
    {
      "id": "stratus",
      "name": "Stratus"
    },
    {
      "id": "viper",
      "name": "Viper"
    }
  ]
},
{
  "id": "fiat",
  "name": "Fiat",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "124-spider",
      "name": "124 Spider"
    },
    {
      "id": "500",
      "name": "500"
    },
    {
      "id": "500l",
      "name": "500L"
    },
    {
      "id": "500x",
      "name": "500X"
    },
    {
      "id": "argo",
      "name": "Argo"
    },
    {
      "id": "bravo",
      "name": "Bravo"
    },
    {
      "id": "cronos",
      "name": "Cronos"
    },
    {
      "id": "doblo",
      "name": "Doblo"
    },
    {
      "id": "ducato",
      "name": "Ducato"
    },
    {
      "id": "fiorino",
      "name": "Fiorino"
    },
    {
      "id": "freemont",
      "name": "Freemont"
    },
    {
      "id": "idea",
      "name": "Idea"
    },
    {
      "id": "linea",
      "name": "Linea"
    },
    {
      "id": "mobi",
      "name": "Mobi"
    },
    {
      "id": "palio",
      "name": "Palio"
    },
    {
      "id": "punto",
      "name": "Punto"
    },
    {
      "id": "qubo",
      "name": "Qubo"
    },
    {
      "id": "siena",
      "name": "Siena"
    },
    {
      "id": "stilo",
      "name": "Stilo"
    },
    {
      "id": "strada",
      "name": "Strada"
    },
    {
      "id": "tipo",
      "name": "Tipo"
    },
    {
      "id": "toro",
      "name": "Toro"
    },
    {
      "id": "uno",
      "name": "Uno"
    }
  ]
},
{
  "id": "ford",
  "name": "Ford",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "bronco",
      "name": "Bronco"
    },
    {
      "id": "ecosport",
      "name": "EcoSport"
    },
    {
      "id": "edge",
      "name": "Edge"
    },
    {
      "id": "escape",
      "name": "Escape"
    },
    {
      "id": "expedition",
      "name": "Expedition"
    },
    {
      "id": "f-150",
      "name": "F-150"
    },
    {
      "id": "fiesta",
      "name": "Fiesta"
    },
    {
      "id": "focus",
      "name": "Focus"
    },
    {
      "id": "fusion",
      "name": "Fusion"
    },
    {
      "id": "galaxy",
      "name": "Galaxy"
    },
    {
      "id": "ka",
      "name": "Ka"
    },
    {
      "id": "kuga",
      "name": "Kuga"
    },
    {
      "id": "maverick",
      "name": "Maverick"
    },
    {
      "id": "mondeo",
      "name": "Mondeo"
    },
    {
      "id": "mustang",
      "name": "Mustang"
    },
    {
      "id": "puma",
      "name": "Puma"
    },
    {
      "id": "ranger",
      "name": "Ranger"
    },
    {
      "id": "raptor",
      "name": "Raptor"
    },
    {
      "id": "territory",
      "name": "Territory"
    },
    {
      "id": "taurus",
      "name": "Taurus"
    },
    {
      "id": "transit",
      "name": "Transit"
    }
  ]
},
{
  "id": "foton",
  "name": "Foton",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "auman",
      "name": "Auman"
    },
    {
      "id": "aumark",
      "name": "Aumark"
    },
    {
      "id": "gratour",
      "name": "Gratour"
    },
    {
      "id": "sauvana",
      "name": "Sauvana"
    },
    {
      "id": "toano",
      "name": "Toano"
    },
    {
      "id": "tunland",
      "name": "Tunland"
    }
  ]
},
{
  "id": "great-wall",
  "name": "Great Wall",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "c30",
      "name": "C30"
    },
    {
      "id": "c50",
      "name": "C50"
    },
    {
      "id": "coolbear",
      "name": "Coolbear"
    },
    {
      "id": "deer",
      "name": "Deer"
    },
    {
      "id": "h3",
      "name": "H3"
    },
    {
      "id": "h5",
      "name": "H5"
    },
    {
      "id": "h6",
      "name": "H6"
    },
    {
      "id": "hover",
      "name": "Hover"
    },
    {
      "id": "m4",
      "name": "M4"
    },
    {
      "id": "poer",
      "name": "Poer"
    },
    {
      "id": "safe",
      "name": "Safe"
    },
    {
      "id": "safe-2.2",
      "name": "Safe 2.2"
    },
    {
      "id": "steed",
      "name": "Steed"
    },
    {
      "id": "voleex",
      "name": "Voleex"
    },
    {
      "id": "wingle",
      "name": "Wingle"
    },
    {
      "id": "wingle-5",
      "name": "Wingle 5"
    },
    {
      "id": "wingle-6",
      "name": "Wingle 6"
    },
    {
      "id": "wingle-7",
      "name": "Wingle 7"
    }
  ]
},
{
  "id": "honda",
  "name": "Honda",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "accord",
      "name": "Accord"
    },
    {
      "id": "br-v",
      "name": "BR-V"
    },
    {
      "id": "civic",
      "name": "Civic"
    },
    {
      "id": "city",
      "name": "City"
    },
    {
      "id": "cr-v",
      "name": "CR-V"
    },
    {
      "id": "element",
      "name": "Element"
    },
    {
      "id": "fit",
      "name": "Fit"
    },
    {
      "id": "hr-v",
      "name": "HR-V"
    },
    {
      "id": "insight",
      "name": "Insight"
    },
    {
      "id": "jazz",
      "name": "Jazz"
    },
    {
      "id": "legend",
      "name": "Legend"
    },
    {
      "id": "n-box",
      "name": "N-Box"
    },
    {
      "id": "nsx",
      "name": "NSX"
    },
    {
      "id": "odyssey",
      "name": "Odyssey"
    },
    {
      "id": "passport",
      "name": "Passport"
    },
    {
      "id": "pilot",
      "name": "Pilot"
    },
    {
      "id": "prelude",
      "name": "Prelude"
    },
    {
      "id": "ridgeline",
      "name": "Ridgeline"
    },
    {
      "id": "s2000",
      "name": "S2000"
    },
    {
      "id": "s660",
      "name": "S660"
    },
    {
      "id": "stream",
      "name": "Stream"
    },
    {
      "id": "type-r",
      "name": "Type R"
    },
    {
      "id": "vezel",
      "name": "Vezel"
    }
  ]
},
{
  "id": "hyundai",
  "name": "Hyundai",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "accent",
      "name": "Accent"
    },
    {
      "id": "accent-2023",
      "name": "Accent 2023"
    },
    {
      "id": "bayon",
      "name": "Bayon"
    },
    {
      "id": "elantra",
      "name": "Elantra"
    },
    {
      "id": "genesis",
      "name": "Genesis"
    },
    {
      "id": "grand-i10",
      "name": "Grand i10"
    },
    {
      "id": "i10",
      "name": "i10"
    },
    {
      "id": "i20",
      "name": "i20"
    },
    {
      "id": "i30",
      "name": "i30"
    },
    {
      "id": "i40",
      "name": "i40"
    },
    {
      "id": "i800",
      "name": "i800"
    },
    {
      "id": "ioniq",
      "name": "Ioniq"
    },
    {
      "id": "ix20",
      "name": "IX20"
    },
    {
      "id": "ix35",
      "name": "IX35"
    },
    {
      "id": "ix55",
      "name": "IX55"
    },
    {
      "id": "kona",
      "name": "Kona"
    },
    {
      "id": "matrix",
      "name": "Matrix"
    },
    {
      "id": "palisade",
      "name": "Palisade"
    },
    {
      "id": "santa-fe",
      "name": "Santa Fe"
    },
    {
      "id": "sonata",
      "name": "Sonata"
    },
    {
      "id": "staria",
      "name": "Staria"
    },
    {
      "id": "terracan",
      "name": "Terracan"
    },
    {
      "id": "tucson",
      "name": "Tucson"
    }
  ]
},
{
  "id": "kia",
  "name": "Kia",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "cadenza",
      "name": "Cadenza"
    },
    {
      "id": "carnival",
      "name": "Carnival"
    },
    {
      "id": "cerato",
      "name": "Cerato"
    },
    {
      "id": "forte",
      "name": "Forte"
    },
    {
      "id": "k5",
      "name": "K5"
    },
    {
      "id": "k7",
      "name": "K7"
    },
    {
      "id": "k8",
      "name": "K8"
    },
    {
      "id": "k9",
      "name": "K9"
    },
    {
      "id": "mohave",
      "name": "Mohave"
    },
    {
      "id": "morning",
      "name": "Morning"
    },
    {
      "id": "niro",
      "name": "Niro"
    },
    {
      "id": "opirus",
      "name": "Opirus"
    },
    {
      "id": "optima",
      "name": "Optima"
    },
    {
      "id": "pegas",
      "name": "Pegas"
    },
    {
      "id": "picanto",
      "name": "Picanto"
    },
    {
      "id": "pregio",
      "name": "Pregio"
    },
    {
      "id": "pride",
      "name": "Pride"
    },
    {
      "id": "proceed",
      "name": "ProCeed"
    },
    {
      "id": "rio",
      "name": "Rio"
    },
    {
      "id": "seltos",
      "name": "Seltos"
    },
    {
      "id": "sonet",
      "name": "Sonet"
    },
    {
      "id": "soul",
      "name": "Soul"
    },
    {
      "id": "sportage",
      "name": "Sportage"
    }
  ]
},
{
  "id": "mg",
  "name": "MG",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "3",
      "name": "3"
    },
    {
      "id": "350",
      "name": "350"
    },
    {
      "id": "5",
      "name": "5"
    },
    {
      "id": "6",
      "name": "6"
    },
    {
      "id": "gs",
      "name": "GS"
    },
    {
      "id": "gs6",
      "name": "GS6"
    },
    {
      "id": "gs8",
      "name": "GS8"
    },
    {
      "id": "marvel-r",
      "name": "Marvel R"
    },
    {
      "id": "mg3",
      "name": "MG3"
    },
    {
      "id": "mg4",
      "name": "MG4"
    },
    {
      "id": "mg5",
      "name": "MG5"
    },
    {
      "id": "mg6",
      "name": "MG6"
    },
    {
      "id": "mg7",
      "name": "MG7"
    },
    {
      "id": "marvel-r",
      "name": "Marvel R"
    },
    {
      "id": "mg8",
      "name": "MG8"
    },
    {
      "id": "mg3",
      "name": "MG3"
    },
    {
      "id": "mg5",
      "name": "MG5"
    },
    {
      "id": "zs",
      "name": "ZS"
    },
    {
      "id": "zs-ev",
      "name": "ZS EV"
    }
  ]
},
{
  "id": "mahindra",
  "name": "Mahindra",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "bolero",
      "name": "Bolero"
    },
    {
      "id": "kuv100",
      "name": "KUV100"
    },
    {
      "id": "pik-up",
      "name": "Pik Up"
    },
    {
      "id": "scorpio",
      "name": "Scorpio"
    },
    {
      "id": "thar",
      "name": "Thar"
    },
    {
      "id": "xuv300",
      "name": "XUV300"
    },
    {
      "id": "xuv500",
      "name": "XUV500"
    },
    {
      "id": "xuv700",
      "name": "XUV700"
    }
  ]
},
{
  "id": "mazda",
  "name": "Mazda",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "2",
      "name": "2"
    },
    {
      "id": "3",
      "name": "3"
    },
    {
      "id": "323",
      "name": "323"
    },
    {
      "id": "5",
      "name": "5"
    },
    {
      "id": "6",
      "name": "6"
    },
    {
      "id": "626",
      "name": "626"
    },
    {
      "id": "929",
      "name": "929"
    },
    {
      "id": "atenza",
      "name": "Atenza"
    },
    {
      "id": "bt-50",
      "name": "BT-50"
    },
    {
      "id": "cx-3",
      "name": "CX-3"
    },
    {
      "id": "cx-30",
      "name": "CX-30"
    },
    {
      "id": "cx-4",
      "name": "CX-4"
    },
    {
      "id": "cx-5",
      "name": "CX-5"
    },
    {
      "id": "cx-60",
      "name": "CX-60"
    },
    {
      "id": "cx-7",
      "name": "CX-7"
    },
    {
      "id": "cx-8",
      "name": "CX-8"
    },
    {
      "id": "cx-9",
      "name": "CX-9"
    },
    {
      "id": "demio",
      "name": "Demio"
    },
    {
      "id": "mx-3",
      "name": "MX-3"
    },
    {
      "id": "mx-5",
      "name": "MX-5"
    },
    {
      "id": "mx-6",
      "name": "MX-6"
    },
    {
      "id": "protege",
      "name": "Protege"
    }
  ]
},
{
  "id": "mercedes-benz",
  "name": "Mercedes-Benz",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "a-class",
      "name": "A-Class"
    },
    {
      "id": "amg-gt",
      "name": "AMG GT"
    },
    {
      "id": "b-class",
      "name": "B-Class"
    },
    {
      "id": "c-class",
      "name": "C-Class"
    },
    {
      "id": "cla",
      "name": "CLA"
    },
    {
      "id": "cls",
      "name": "CLS"
    },
    {
      "id": "e-class",
      "name": "E-Class"
    },
    {
      "id": "eqa",
      "name": "EQA"
    },
    {
      "id": "eqb",
      "name": "EQB"
    },
    {
      "id": "eqc",
      "name": "EQC"
    },
    {
      "id": "eqe",
      "name": "EQE"
    },
    {
      "id": "eqs",
      "name": "EQS"
    },
    {
      "id": "g-class",
      "name": "G-Class"
    },
    {
      "id": "gla",
      "name": "GLA"
    },
    {
      "id": "glb",
      "name": "GLB"
    },
    {
      "id": "glc",
      "name": "GLC"
    },
    {
      "id": "gle",
      "name": "GLE"
    },
    {
      "id": "glk",
      "name": "GLK"
    },
    {
      "id": "gls",
      "name": "GLS"
    },
    {
      "id": "gt",
      "name": "GT"
    },
    {
      "id": "gts",
      "name": "GTS"
    },
    {
      "id": "ml-class",
      "name": "ML-Class"
    },
    {
      "id": "sprinter",
      "name": "Sprinter"
    }
  ]
},
{
  "id": "mitsubishi",
  "name": "Mitsubishi",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "asx",
      "name": "ASX"
    },
    {
      "id": "canter",
      "name": "Canter"
    },
    {
      "id": "diamante",
      "name": "Diamante"
    },
    {
      "id": "eclipse-cross",
      "name": "Eclipse Cross"
    },
    {
      "id": "endeavor",
      "name": "Endeavor"
    },
    {
      "id": "evolution",
      "name": "Evolution"
    },
    {
      "id": "expander",
      "name": "Expander"
    },
    {
      "id": "fto",
      "name": "FTO"
    },
    {
      "id": "galant",
      "name": "Galant"
    },
    {
      "id": "i-miev",
      "name": "i-MiEV"
    },
    {
      "id": "l200",
      "name": "L200"
    },
    {
      "id": "lancer",
      "name": "Lancer"
    },
    {
      "id": "mirage",
      "name": "Mirage"
    },
    {
      "id": "montero",
      "name": "Montero"
    },
    {
      "id": "outlander",
      "name": "Outlander"
    },
    {
      "id": "outlander-phev",
      "name": "Outlander PHEV"
    },
    {
      "id": "pajero",
      "name": "Pajero"
    },
    {
      "id": "pajero-sport",
      "name": "Pajero Sport"
    },
    {
      "id": "rosa",
      "name": "Rosa"
    },
    {
      "id": "4p10",
      "name": "4P10"
    },
    {
      "id": "canter",
      "name": "Canter"
    },
    {
      "id": "delica",
      "name": "Delica"
    },
    {
      "id": "fuso",
      "name": "Fuso"
    }
  ]
},
{
  "id": "nissan",
  "name": "Nissan",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "altima",
      "name": "Altima"
    },
    {
      "id": "armada",
      "name": "Armada"
    },
    {
      "id": "frontier",
      "name": "Frontier"
    },
    {
      "id": "gt-r",
      "name": "GT-R"
    },
    {
      "id": "juke",
      "name": "Juke"
    },
    {
      "id": "kicks",
      "name": "Kicks"
    },
    {
      "id": "leaf",
      "name": "Leaf"
    },
    {
      "id": "maxima",
      "name": "Maxima"
    },
    {
      "id": "micra",
      "name": "Micra"
    },
    {
      "id": "murano",
      "name": "Murano"
    },
    {
      "id": "note",
      "name": "Note"
    },
    {
      "id": "np300",
      "name": "NP300"
    },
    {
      "id": "nv200",
      "name": "NV200"
    },
    {
      "id": "nv350",
      "name": "NV350"
    },
    {
      "id": "pathfinder",
      "name": "Pathfinder"
    },
    {
      "id": "primera",
      "name": "Primera"
    },
    {
      "id": "pulsar",
      "name": "Pulsar"
    },
    {
      "id": "qashqai",
      "name": "Qashqai"
    },
    {
      "id": "quest",
      "name": "Quest"
    },
    {
      "id": "rogue",
      "name": "Rogue"
    },
    {
      "id": "rd28",
      "name": "RD28"
    },
    {
      "id": "sentra",
      "name": "Sentra"
    }
  ]
},
{
  "id": "peugeot",
  "name": "Peugeot",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "106",
      "name": "106"
    },
    {
      "id": "108",
      "name": "108"
    },
    {
      "id": "2008",
      "name": "2008"
    },
    {
      "id": "206",
      "name": "206"
    },
    {
      "id": "207",
      "name": "207"
    },
    {
      "id": "208",
      "name": "208"
    },
    {
      "id": "2008",
      "name": "2008"
    },
    {
      "id": "3008",
      "name": "3008"
    },
    {
      "id": "308",
      "name": "308"
    },
    {
      "id": "308-2023",
      "name": "308 2023"
    },
    {
      "id": "3008",
      "name": "3008"
    },
    {
      "id": "405",
      "name": "405"
    },
    {
      "id": "406",
      "name": "406"
    },
    {
      "id": "407",
      "name": "407"
    },
    {
      "id": "408",
      "name": "408"
    },
    {
      "id": "5008",
      "name": "5008"
    },
    {
      "id": "508",
      "name": "508"
    },
    {
      "id": "607",
      "name": "607"
    },
    {
      "id": "806",
      "name": "806"
    },
    {
      "id": "807",
      "name": "807"
    },
    {
      "id": "expert",
      "name": "Expert"
    },
    {
      "id": "ion",
      "name": "iOn"
    }
  ]
},
{
  "id": "renault",
  "name": "Renault",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "alaskan",
      "name": "Alaskan"
    },
    {
      "id": "captur",
      "name": "Captur"
    },
    {
      "id": "clio",
      "name": "Clio"
    },
    {
      "id": "duster",
      "name": "Duster"
    },
    {
      "id": "fluence",
      "name": "Fluence"
    },
    {
      "id": "kadjar",
      "name": "Kadjar"
    },
    {
      "id": "kangoo",
      "name": "Kangoo"
    },
    {
      "id": "koleos",
      "name": "Koleos"
    },
    {
      "id": "laguna",
      "name": "Laguna"
    },
    {
      "id": "latitude",
      "name": "Latitude"
    },
    {
      "id": "logan",
      "name": "Logan"
    },
    {
      "id": "megane",
      "name": "Megane"
    },
    {
      "id": "modus",
      "name": "Modus"
    },
    {
      "id": "sandero",
      "name": "Sandero"
    },
    {
      "id": "scenic",
      "name": "Scenic"
    },
    {
      "id": "symbol",
      "name": "Symbol"
    },
    {
      "id": "talisman",
      "name": "Talisman"
    },
    {
      "id": "twingo",
      "name": "Twingo"
    },
    {
      "id": "zoe",
      "name": "Zoe"
    }
  ]
},
{
  "id": "subaru",
  "name": "Subaru",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "ascent",
      "name": "Ascent"
    },
    {
      "id": "brz",
      "name": "BRZ"
    },
    {
      "id": "crosstrek",
      "name": "Crosstrek"
    },
    {
      "id": "forester",
      "name": "Forester"
    },
    {
      "id": "impreza",
      "name": "Impreza"
    },
    {
      "id": "legacy",
      "name": "Legacy"
    },
    {
      "id": "levorg",
      "name": "Levorg"
    },
    {
      "id": "outback",
      "name": "Outback"
    },
    {
      "id": "sti",
      "name": "STI"
    }
  ]
},
{
  "id": "suzuki",
  "name": "Suzuki",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "alto",
      "name": "Alto"
    },
    {
      "id": "apv",
      "name": "APV"
    },
    {
      "id": "baleno",
      "name": "Baleno"
    },
    {
      "id": "celerio",
      "name": "Celerio"
    },
    {
      "id": "ciaz",
      "name": "Ciaz"
    },
    {
      "id": "dzire",
      "name": "Dzire"
    },
    {
      "id": "ertiga",
      "name": "Ertiga"
    },
    {
      "id": "grand-vitara",
      "name": "Grand Vitara"
    },
    {
      "id": "ignis",
      "name": "Ignis"
    },
    {
      "id": "jimny",
      "name": "Jimny"
    },
    {
      "id": "kizashi",
      "name": "Kizashi"
    },
    {
      "id": "maruti",
      "name": "Maruti"
    },
    {
      "id": "sx4",
      "name": "SX4"
    },
    {
      "id": "swift",
      "name": "Swift"
    },
    {
      "id": "sx4-s-cross",
      "name": "SX4 S-Cross"
    },
    {
      "id": "vitara",
      "name": "Vitara"
    },
    {
      "id": "wagon-r",
      "name": "Wagon R"
    },
    {
      "id": "xl6",
      "name": "XL6"
    }
  ]
},
{
  "id": "toyota",
  "name": "Toyota",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "4runner",
      "name": "4Runner"
    },
    {
      "id": "86",
      "name": "86"
    },
    {
      "id": "alphard",
      "name": "Alphard"
    },
    {
      "id": "avalon",
      "name": "Avalon"
    },
    {
      "id": "camry",
      "name": "Camry"
    },
    {
      "id": "c-hr",
      "name": "C-HR"
    },
    {
      "id": "celica",
      "name": "Celica"
    },
    {
      "id": "century",
      "name": "Century"
    },
    {
      "id": "corolla",
      "name": "Corolla"
    },
    {
      "id": "corolla-cross",
      "name": "Corolla Cross"
    },
    {
      "id": "crown",
      "name": "Crown"
    },
    {
      "id": "fj-cruiser",
      "name": "FJ Cruiser"
    },
    {
      "id": "fortuner",
      "name": "Fortuner"
    },
    {
      "id": "gr86",
      "name": "GR86"
    },
    {
      "id": "gr-supra",
      "name": "GR Supra"
    },
    {
      "id": "highlander",
      "name": "Highlander"
    },
    {
      "id": "hilux",
      "name": "Hilux"
    },
    {
      "id": "land-cruiser",
      "name": "Land Cruiser"
    },
    {
      "id": "land-cruiser-prado",
      "name": "Land Cruiser Prado"
    },
    {
      "id": "mirai",
      "name": "Mirai"
    },
    {
      "id": "prius",
      "name": "Prius"
    },
    {
      "id": "rav4",
      "name": "RAV4"
    }
  ]
},
{
  "id": "volkswagen",
  "name": "Volkswagen",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    },
    {
      "id": "amarok",
      "name": "Amarok"
    },
    {
      "id": "atlas",
      "name": "Atlas"
    },
    {
      "id": "arteon",
      "name": "Arteon"
    },
    {
      "id": "beetle",
      "name": "Beetle"
    },
    {
      "id": "bora",
      "name": "Bora"
    },
    {
      "id": "caddy",
      "name": "Caddy"
    },
    {
      "id": "california",
      "name": "California"
    },
    {
      "id": "cc",
      "name": "CC"
    },
    {
      "id": "constellation",
      "name": "Constellation"
    },
    {
      "id": "crafter",
      "name": "Crafter"
    },
    {
      "id": "golf",
      "name": "Golf"
    },
    {
      "id": "id.3",
      "name": "ID.3"
    },
    {
      "id": "id.4",
      "name": "ID.4"
    },
    {
      "id": "id.5",
      "name": "ID.5"
    },
    {
      "id": "id.6",
      "name": "ID.6"
    },
    {
      "id": "jetta",
      "name": "Jetta"
    },
    {
      "id": "passat",
      "name": "Passat"
    },
    {
      "id": "polo",
      "name": "Polo"
    },
    {
      "id": "scirocco",
      "name": "Scirocco"
    },
    {
      "id": "sharan",
      "name": "Sharan"
    },
    {
      "id": "t-cross",
      "name": "T-Cross"
    },
    {
      "id": "t-roc",
      "name": "T-Roc"
    }
  ]
},
{
  "id": "varios",
  "name": "Varios",
  "models": [
    {
      "id": "varios",
      "name": "Varios"
    }
  ]
},
{
  "id": "byd",
  "name": "BYD",
  "models": [
    {
      "id": "han",
      "name": "Han"
    },
    {
      "id": "dolphin",
      "name": "Dolphin"
    },
    {
      "id": "e6",
      "name": "E6"
    },
    {
      "id": "han",
      "name": "Han"
    },
    {
      "id": "qin",
      "name": "Qin"
    },
    {
      "id": "seal",
      "name": "Seal"
    },
    {
      "id": "song",
      "name": "Song"
    },
    {
      "id": "tang",
      "name": "Tang"
    },
    {
      "id": "yuan",
      "name": "Yuan"
    }
  ]
},
{
  "id": "cadillac",
  "name": "Cadillac",
  "models": [
    {
      "id": "ats",
      "name": "ATS"
    },
    {
      "id": "ct4",
      "name": "CT4"
    },
    {
      "id": "ct5",
      "name": "CT5"
    },
    {
      "id": "escalade",
      "name": "Escalade"
    },
    {
      "id": "xt4",
      "name": "XT4"
    },
    {
      "id": "xt5",
      "name": "XT5"
    },
    {
      "id": "xt6",
      "name": "XT6"
    }
  ]
},
{
  "id": "changan",
  "name": "Changan",
  "models": [
    {
      "id": "cs35",
      "name": "CS35"
    },
    {
      "id": "cs55",
      "name": "CS55"
    },
    {
      "id": "cs75",
      "name": "CS75"
    },
    {
      "id": "cs85",
      "name": "CS85"
    },
    {
      "id": "cs95",
      "name": "CS95"
    },
    {
      "id": "eado",
      "name": "Eado"
    },
    {
      "id": "hunter",
      "name": "Hunter"
    },
    {
      "id": "linmax",
      "name": "Linmax"
    },
    {
      "id": "raeton",
      "name": "Raeton"
    },
    {
      "id": "uni-k",
      "name": "UNI-K"
    },
    {
      "id": "uni-t",
      "name": "UNI-T"
    }
  ]
},
{
  "id": "citroen",
  "name": "Citroen",
  "models": [
    {
      "id": "c3",
      "name": "C3"
    },
    {
      "id": "c4",
      "name": "C4"
    },
    {
      "id": "c4-cactus",
      "name": "C4 Cactus"
    },
    {
      "id": "c5",
      "name": "C5"
    },
    {
      "id": "c5-x",
      "name": "C5 X"
    },
    {
      "id": "c6",
      "name": "C6"
    },
    {
      "id": "jumper",
      "name": "Jumper"
    },
    {
      "id": "jumpy",
      "name": "Jumpy"
    },
    {
      "id": "spacetourer",
      "name": "SpaceTourer"
    }
  ]
},
{
  "id": "daihatsu",
  "name": "Daihatsu",
  "models": [
    {
      "id": "charade",
      "name": "Charade"
    },
    {
      "id": "mira",
      "name": "Mira"
    },
    {
      "id": "rocky",
      "name": "Rocky"
    },
    {
      "id": "sirion",
      "name": "Sirion"
    },
    {
      "id": "terios",
      "name": "Terios"
    },
    {
      "id": "xenia",
      "name": "Xenia"
    },
    {
      "id": "yrv",
      "name": "YRV"
    }
  ]
},
{
  "id": "dongfeng",
  "name": "Dongfeng",
  "models": [
    {
      "id": "d90",
      "name": "D90"
    },
    {
      "id": "fengshen",
      "name": "Fengshen"
    },
    {
      "id": "fengshen-ax7",
      "name": "Fengshen AX7"
    },
    {
      "id": "glory",
      "name": "Glory"
    },
    {
      "id": "rich-6",
      "name": "Rich 6"
    },
    {
      "id": "rich-8",
      "name": "Rich 8"
    },
    {
      "id": "s50",
      "name": "S50"
    },
    {
      "id": "t5",
      "name": "T5"
    },
    {
      "id": "t7",
      "name": "T7"
    }
  ]
},
{
  "id": "geely",
  "name": "Geely",
  "models": [
    {
      "id": "coolray",
      "name": "Coolray"
    },
    {
      "id": "emgrand",
      "name": "Emgrand"
    },
    {
      "id": "geometry-a",
      "name": "Geometry A"
    },
    {
      "id": "geometry-c",
      "name": "Geometry C"
    },
    {
      "id": "icon",
      "name": "Icon"
    },
    {
      "id": "nl-3",
      "name": "NL-3"
    },
    {
      "id": "panda",
      "name": "Panda"
    },
    {
      "id": "preface",
      "name": "Preface"
    },
    {
      "id": "sc7",
      "name": "SC7"
    },
    {
      "id": "sx11",
      "name": "SX11"
    },
    {
      "id": "sx12",
      "name": "SX12"
    }
  ]
},
{
  "id": "gmc",
  "name": "GMC",
  "models": [
    {
      "id": "acadia",
      "name": "Acadia"
    },
    {
      "id": "canyon",
      "name": "Canyon"
    },
    {
      "id": "hummer",
      "name": "Hummer"
    },
    {
      "id": "sierra",
      "name": "Sierra"
    },
    {
      "id": "terrain",
      "name": "Terrain"
    },
    {
      "id": "yukon",
      "name": "Yukon"
    }
  ]
},
{
  "id": "haval",
  "name": "Haval",
  "models": [
    {
      "id": "f7",
      "name": "F7"
    },
    {
      "id": "h2",
      "name": "H2"
    },
    {
      "id": "h4",
      "name": "H4"
    },
    {
      "id": "h5",
      "name": "H5"
    },
    {
      "id": "h6",
      "name": "H6"
    },
    {
      "id": "h7",
      "name": "H7"
    },
    {
      "id": "h8",
      "name": "H8"
    },
    {
      "id": "h9",
      "name": "H9"
    },
    {
      "id": "hb01",
      "name": "HB01"
    },
    {
      "id": "jolion",
      "name": "Jolion"
    }
  ]
},
{
  "id": "isuzu",
  "name": "Isuzu",
  "models": [
    {
      "id": "d-max",
      "name": "D-Max"
    },
    {
      "id": "mu-x",
      "name": "MU-X"
    },
    {
      "id": "npr",
      "name": "NPR"
    },
    {
      "id": "nkr",
      "name": "NKR"
    },
    {
      "id": "nlr",
      "name": "NLR"
    },
    {
      "id": "npr",
      "name": "NPR"
    },
    {
      "id": "nkr",
      "name": "NKR"
    },
    {
      "id": "nps",
      "name": "NPS"
    },
    {
      "id": "nqr",
      "name": "NQR"
    },
    {
      "id": "reward",
      "name": "Reward"
    }
  ]
},
{
  "id": "jac",
  "name": "JAC",
  "models": [
    {
      "id": "e10x",
      "name": "E10X"
    },
    {
      "id": "j3",
      "name": "J3"
    },
    {
      "id": "j4",
      "name": "J4"
    },
    {
      "id": "j5",
      "name": "J5"
    },
    {
      "id": "j7",
      "name": "J7"
    },
    {
      "id": "s2",
      "name": "S2"
    },
    {
      "id": "s3",
      "name": "S3"
    },
    {
      "id": "s5",
      "name": "S5"
    },
    {
      "id": "s7",
      "name": "S7"
    },
    {
      "id": "t6",
      "name": "T6"
    },
    {
      "id": "t8",
      "name": "T8"
    }
  ]
},
{
  "id": "jeep",
  "name": "Jeep",
  "models": [
    {
      "id": "cherokee",
      "name": "Cherokee"
    },
    {
      "id": "compass",
      "name": "Compass"
    },
    {
      "id": "gladiator",
      "name": "Gladiator"
    },
    {
      "id": "grand-cherokee",
      "name": "Grand Cherokee"
    },
    {
      "id": "patriot",
      "name": "Patriot"
    },
    {
      "id": "renegade",
      "name": "Renegade"
    },
    {
      "id": "wagoneer",
      "name": "Wagoneer"
    },
    {
      "id": "wrangler",
      "name": "Wrangler"
    }
  ]
},
{
  "id": "land-rover",
  "name": "Land Rover",
  "models": [
    {
      "id": "discovery",
      "name": "Discovery"
    },
    {
      "id": "discovery-sport",
      "name": "Discovery Sport"
    },
    {
      "id": "evoque",
      "name": "Evoque"
    },
    {
      "id": "freelander",
      "name": "Freelander"
    },
    {
      "id": "range-rover",
      "name": "Range Rover"
    },
    {
      "id": "range-rover-sport",
      "name": "Range Rover Sport"
    },
    {
      "id": "range-rover-velar",
      "name": "Range Rover Velar"
    }
  ]
},
{
  "id": "lexus",
  "name": "Lexus",
  "models": [
    {
      "id": "ct",
      "name": "CT"
    },
    {
      "id": "es",
      "name": "ES"
    },
    {
      "id": "gs",
      "name": "GS"
    },
    {
      "id": "is",
      "name": "IS"
    },
    {
      "id": "lc",
      "name": "LC"
    },
    {
      "id": "ls",
      "name": "LS"
    },
    {
      "id": "lx",
      "name": "LX"
    },
    {
      "id": "nx",
      "name": "NX"
    },
    {
      "id": "rc",
      "name": "RC"
    },
    {
      "id": "rx",
      "name": "RX"
    },
    {
      "id": "ux",
      "name": "UX"
    }
  ]
},
{
  "id": "maruti",
  "name": "Maruti",
  "models": [
    {
      "id": "alto",
      "name": "Alto"
    },
    {
      "id": "baleno",
      "name": "Baleno"
    },
    {
      "id": "celerio",
      "name": "Celerio"
    },
    {
      "id": "ciaz",
      "name": "Ciaz"
    },
    {
      "id": "dzire",
      "name": "Dzire"
    },
    {
      "id": "ertiga",
      "name": "Ertiga"
    },
    {
      "id": "ignis",
      "name": "Ignis"
    },
    {
      "id": "s-cross",
      "name": "S-Cross"
    },
    {
      "id": "s-presso",
      "name": "S-Presso"
    },
    {
      "id": "swift",
      "name": "Swift"
    },
    {
      "id": "vitara",
      "name": "Vitara"
    },
    {
      "id": "wagon-r",
      "name": "Wagon R"
    },
    {
      "id": "xl6",
      "name": "XL6"
    }
  ]
},
{
  "id": "mini",
  "name": "MINI",
  "models": [
    {
      "id": "cooper",
      "name": "Cooper"
    },
    {
      "id": "cooper-s",
      "name": "Cooper S"
    },
    {
      "id": "countryman",
      "name": "Countryman"
    },
    {
      "id": "clubman",
      "name": "Clubman"
    },
    {
      "id": "convertible",
      "name": "Convertible"
    },
    {
      "id": "electric",
      "name": "Electric"
    },
    {
      "id": "jcw",
      "name": "JCW"
    },
    {
      "id": "one",
      "name": "One"
    },
    {
      "id": "paceman",
      "name": "Paceman"
    },
    {
      "id": "roadster",
      "name": "Roadster"
    }
  ]
},
{
  "id": "opel",
  "name": "Opel",
  "models": [
    {
      "id": "astra",
      "name": "Astra"
    },
    {
      "id": "corsa",
      "name": "Corsa"
    },
    {
      "id": "crossland",
      "name": "Crossland"
    },
    {
      "id": "grandland",
      "name": "Grandland"
    },
    {
      "id": "insignia",
      "name": "Insignia"
    },
    {
      "id": "karl",
      "name": "Karl"
    },
    {
      "id": "mokka",
      "name": "Mokka"
    },
    {
      "id": "vectra",
      "name": "Vectra"
    },
    {
      "id": "zafira",
      "name": "Zafira"
    }
  ]
},
{
  "id": "ram",
  "name": "Ram",
  "models": [
    {
      "id": "1500",
      "name": "1500"
    },
    {
      "id": "2500",
      "name": "2500"
    },
    {
      "id": "3500",
      "name": "3500"
    },
    {
      "id": "4500",
      "name": "4500"
    },
    {
      "id": "promaster",
      "name": "ProMaster"
    },
    {
      "id": "rebel",
      "name": "Rebel"
    },
    {
      "id": "trx",
      "name": "TRX"
    }
  ]
},
{
  "id": "seat",
  "name": "SEAT",
  "models": [
    {
      "id": "arona",
      "name": "Arona"
    },
    {
      "id": "ateca",
      "name": "Ateca"
    },
    {
      "id": "ibiza",
      "name": "Ibiza"
    },
    {
      "id": "leon",
      "name": "Leon"
    },
    {
      "id": "tarraco",
      "name": "Tarraco"
    },
    {
      "id": "toledo",
      "name": "Toledo"
    }
  ]
},
{
  "id": "skoda",
  "name": "Skoda",
  "models": [
    {
      "id": "fabia",
      "name": "Fabia"
    },
    {
      "id": "kamiq",
      "name": "Kamiq"
    },
    {
      "id": "karoq",
      "name": "Karoq"
    },
    {
      "id": "kodiaq",
      "name": "Kodiaq"
    },
    {
      "id": "octavia",
      "name": "Octavia"
    },
    {
      "id": "rapid",
      "name": "Rapid"
    },
    {
      "id": "roomster",
      "name": "Roomster"
    },
    {
      "id": "scout",
      "name": "Scout"
    },
    {
      "id": "superb",
      "name": "Superb"
    },
    {
      "id": "yeti",
      "name": "Yeti"
    }
  ]
},
{
  "id": "volvo",
  "name": "Volvo",
  "models": [
    {
      "id": "c30",
      "name": "C30"
    },
    {
      "id": "c40",
      "name": "C40"
    },
    {
      "id": "c60",
      "name": "C60"
    },
    {
      "id": "c70",
      "name": "C70"
    },
    {
      "id": "s40",
      "name": "S40"
    },
    {
      "id": "s60",
      "name": "S60"
    },
    {
      "id": "s70",
      "name": "S70"
    },
    {
      "id": "s80",
      "name": "S80"
    },
    {
      "id": "s90",
      "name": "S90"
    },
    {
      "id": "v40",
      "name": "V40"
    },
    {
      "id": "v50",
      "name": "V50"
    },
    {
      "id": "v60",
      "name": "V60"
    },
    {
      "id": "v70",
      "name": "V70"
    },
    {
      "id": "v90",
      "name": "V90"
    },
    {
      "id": "xc40",
      "name": "XC40"
    },
    {
      "id": "xc60",
      "name": "XC60"
    },
    {
      "id": "xc70",
      "name": "XC70"
    },
    {
      "id": "xc90",
      "name": "XC90"
    }
  }
}
];

export const VehicleUtils = {
    getBrandById: (brandId: string): VehicleBrand | undefined => {
        return vehicleBrands.find(brand => brand.id === brandId);
    },

    getBrandByName: (brandName: string): VehicleBrand | undefined => {
        return vehicleBrands.find(brand => brand.name.toLowerCase() === brandName.toLowerCase());
    },

    getModelsByBrandId: (brandId: string): VehicleModel[] => {
        const brand = VehicleUtils.getBrandById(brandId);
        return brand ? brand.models : [];
    },

    getModelById: (brandId: string, modelId: string): VehicleModel | undefined => {
        const brand = VehicleUtils.getBrandById(brandId);
        return brand?.models.find(model => model.id === modelId);
    },

    getAllBrandNames: (): string[] => {
        return vehicleBrands.map(brand => brand.name);
    },

    getAllBrandIds: (): string[] => {
        return vehicleBrands.map(brand => brand.id);
    },

    validateBrandAndModel: (brandId: string, modelId: string): boolean => {
        const brand = VehicleUtils.getBrandById(brandId);
        if (!brand) return false;
        return brand.models.some(model => model.id === modelId);
    }
};
