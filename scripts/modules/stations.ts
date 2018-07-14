import { getLevenshteinDistance } from "../utils/levenshtein_distance";

// export type StationName =
//     "baclaran"
//     | "edsa"
//     | "libertad"
//     | "gil_puyat"
//     | "vito_cruz"
//     | "quirino"
//     | "pedro_gil"
//     | "un_ave"
//     | "central"
//     | "carriedo"
//     | "doroteo_jose"
//     | "bambang"
//     | "tayuman"
//     | "blumentritt"
//     | "abad_santos"
//     | "r_papa"
//     | "5th_ave"
//     | "monumento"
//     | "balintawak"
//     | "roosevelt"

export enum StationName {
    baclaran = "baclaran",
    edsa = "edsa",
    libertad = "libertad",
    gil_puyat = "gil_puyat",
    vito_cruz = "vito_cruz",
    quirino = "quirino",
    pedro_gil = "pedro_gil",
    un_ave = "un_ave",
    central = "central",
    carriedo = "carriedo",
    doroteo_jose = "doroteo_jose",
    bambang = "bambang",
    tayuman = "tayuman",
    blumentritt = "blumentritt",
    abad_santos = "abad_santos",
    r_papa = "r_papa",
    fifth_ave = "5th_ave",
    monumento = "monumento",
    balintawak = "balintawak",
    roosevelt = "roosevelt",
}
export enum StationTrainState {
    IsIn = "is_in",
    JustLeft = "just_left"
}

export type Station = {
    shortName: StationName,
    longName: string,
    altNames?: string[]
    address: string
}

export const STATIONS: Station[] = [
    {
        shortName: StationName.baclaran,
        longName: "Baclaran Terminal",
        address: "Taft Ave Ext, Pasay, Metro Manila"
    },
    {
        shortName: StationName.edsa,
        longName: "EDSA Station",
        address: "Taft Ave, Pasay, 1300 Metro Manila"
    },
    {
        shortName: StationName.libertad,
        longName: "Libertad Station",
        address: "Antonio S. Arnaiz Ave, Pasay, Metro Manila"
    },
    {
        shortName: StationName.gil_puyat,
        longName: "Gil Puyat Station",
        address: "2741 Taft Ave Pasay City, Pasay, Metro Manila"
    },
    {
        shortName: StationName.vito_cruz,
        longName: "Vito Cruz Station",
        address: "Malate, Manila, 1004 Metro Manila"
    },
    {
        shortName: StationName.quirino,
        longName: "Quirino Station",
        address: "Taft Avenue cor Pres. Elpidio Quirino Avenue, Malate, Manila 1004"
    },
    {
        shortName: StationName.pedro_gil,
        longName: "Pedro Gil Station",
        address: "	Taft Avenue cor. Pedro Gil Street, Ermita, Manila 1000"
    },
    {
        shortName: StationName.un_ave,
        longName: "United Nations Station",
        altNames: ["United Nations"],
        address: "	Taft Avenue cor. General Luna St. and United Nations Avenue, Ermita, Manila 1000"
    },
    {
        shortName: StationName.central,
        longName: "Central Terminal",
        address: "Arroceros Street, Ermita, Manila"
    },
    {
        shortName: StationName.carriedo,
        longName: "Carriedo Station",
        address: "Carriedo St, Quiapo, Manila, 1001 Metro Manila"
    },
    {
        shortName: StationName.doroteo_jose,
        longName: "Doroteo Jose Station",
        address: "Rizal Avenue cor. Doroteo Jose St. Santa Cruz, Manila"
    },
    {
        shortName: StationName.bambang,
        longName: "Bambang Station",
        address: "1367 Rizal Avenue cor. Bambang St., Santa Cruz, Manila 1003"
    },
    {
        shortName: StationName.tayuman,
        longName: "Tayuman Station",
        address: "1921 Rizal Avenue cor. Tayuman Street, Santa Cruz, Manila 1014"
    },
    {
        shortName: StationName.blumentritt,
        longName: "Blumentritt Station",
        address: "Rizal Avenue cor. New Antipolo and Blumentritt Road Sta. Cruz, Manila"
    },
    {
        shortName: StationName.abad_santos,
        longName: "Abad Santos Station",
        address: "Rizal Avenue cor. Abad Santos Avenue, Bgy. 208 Zone 019 Manuguit, Tondo, Manila"
    },
    {
        shortName: StationName.r_papa,
        longName: "R. Papa Station",
        address: "3405 Rizal Avenue Extension cor. Ricardo Papa Street, Brgy. Obrero, Tondo, Manila 1013"
    },
    {
        shortName: StationName.fifth_ave,
        longName: "5th Avenue Station",
        address: "242 Rizal Avenue Extension cor. 5th Avenue (C-3), Grace Park East, Caloocan 1403"
    },
    {
        shortName: StationName.monumento,
        longName: "Monumento Station",
        address: "706 Rizal Avenue Extension, Grace Park East, Caloocan 1403"
    },
    {
        shortName: StationName.balintawak,
        longName: "Balintawak Station",
        address: "1179 Epifanio de los Santos Avenue, Brgy. Apolonio Samson, Balintawak, Quezon City 1106"
    },
    {
        shortName: StationName.roosevelt,
        longName: "Roosevelt Station",
        address: "1039 Epifanio de los Santos Avenue cor. Roosevelt Avenue and Congressional Ave., Brgy. Ramon Magsaysay, Bago Bantay, Quezon City 1105"
    }
]
export const STATION_ORDER = STATIONS.map(s => s.shortName)

export const FAIR_MATRIX_BEEP: number[][] = [
    [],
    [],
    []
]
export const FAIR_MATRIX_REG: number[][] = [
    [],
    [],
    []
]

export const LANDMARKS: Map<StationName, string[]> = new Map<StationName, string[]>()
LANDMARKS.set(StationName.baclaran, [])
LANDMARKS.set(StationName.edsa, [])
LANDMARKS.set(StationName.libertad, [])
LANDMARKS.set(StationName.gil_puyat, [])
LANDMARKS.set(StationName.vito_cruz, [])
LANDMARKS.set(StationName.quirino, [])
LANDMARKS.set(StationName.pedro_gil, [])
LANDMARKS.set(StationName.un_ave, [])
LANDMARKS.set(StationName.central, [])
LANDMARKS.set(StationName.carriedo, [])
LANDMARKS.set(StationName.doroteo_jose, [])
LANDMARKS.set(StationName.bambang, [])
LANDMARKS.set(StationName.tayuman, [])
LANDMARKS.set(StationName.blumentritt, [])
LANDMARKS.set(StationName.abad_santos, [])
LANDMARKS.set(StationName.r_papa, [])
LANDMARKS.set(StationName.fifth_ave, [])
LANDMARKS.set(StationName.monumento, [])
LANDMARKS.set(StationName.balintawak, [])
LANDMARKS.set(StationName.roosevelt, [])

export function station(station: StationName): Station {
    return STATIONS.find(s => s.shortName == station)
}
export function findNorth(station: StationName): StationName {
    return STATION_ORDER[STATION_ORDER.findIndex(s => s == station) + 1]
}
export function findSouth(station: StationName): StationName {
    return STATION_ORDER[STATION_ORDER.findIndex(s => s == station) - 1]
}

export function stationOrder(station: StationName): number {
    return STATION_ORDER.indexOf(station)
}
export function FindStation(fuzzyStation: string): StationName[] {
    fuzzyStation = (fuzzyStation || "").trim().replace(new RegExp(" +"), "_").toLowerCase()

    let list: [number, string, StationName][] = []

    for (let station of STATIONS) {

        let id = station.shortName
        list.push([getLevenshteinDistance(fuzzyStation, station.shortName), station.shortName, id])
        list.push([getLevenshteinDistance(fuzzyStation, station.longName), station.longName, id])
        if (station.altNames) {
            station.altNames.forEach(altName => list.push([getLevenshteinDistance(fuzzyStation, altName), altName, id]))
        }
    }

    list = list.sort((a, b) => a[0] - b[0])

    let ranking: StationName[] = []
    list.forEach(r => {
        let shortName = r[2]
        if (ranking.indexOf(shortName) < 0) {
            ranking.push(shortName)
        }
    })

    return ranking;
}

export function fairCost(from: StationName, to: StationName, isBeepCard?: boolean): number {
    if (isBeepCard)
        return FAIR_MATRIX_BEEP[stationOrder(from)][stationOrder(to)]
    return FAIR_MATRIX_REG[stationOrder(from)][stationOrder(to)]
}

export function landmarks(station: StationName): string[] {
    return LANDMARKS.get(station) || []
}