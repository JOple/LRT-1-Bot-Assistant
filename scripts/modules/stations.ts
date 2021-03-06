import stringSimilarity = require('string-similarity')

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
        altNames: ["balintawak"],
        address: "1179 Epifanio de los Santos Avenue, Brgy. Apolonio Samson, Balintawak, Quezon City 1106"
    },
    {
        shortName: StationName.roosevelt,
        longName: "Roosevelt Station",
        address: "1039 Epifanio de los Santos Avenue cor. Roosevelt Avenue and Congressional Ave., Brgy. Ramon Magsaysay, Bago Bantay, Quezon City 1105"
    }
]
export const STATION_ORDER_SHORT = STATIONS.map(s => s.shortName)
export const STATION_ORDER_LONG = STATIONS.map(s => s.longName)

export const FAIR_MATRIX_BEEP: number[][] = [
    [11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 21, 22, 23, 24, 25, 27, 29],
    [12, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 27, 29],
    [13, 12, 11, 12, 13, 14, 14, 15, 16, 17, 18, 18, 19, 20, 21, 21, 22, 23, 26, 28],
    [13, 13, 12, 11, 12, 13, 14, 14, 16, 16, 17, 18, 18, 19, 20, 21, 22, 23, 25, 27],
    [14, 14, 13, 12, 11, 12, 13, 13, 15, 15, 16, 17, 17, 18, 19, 20, 21, 22, 24, 26],
    [15, 15, 14, 13, 12, 11, 12, 13, 14, 14, 15, 16, 16, 17, 18, 19, 20, 21, 23, 25],
    [16, 15, 14, 14, 13, 12, 11, 12, 13, 14, 14, 15, 16, 16, 17, 18, 19, 20, 22, 24],
    [17, 16, 15, 14, 13, 13, 12, 11, 12, 13, 14, 14, 15, 16, 17, 17, 18, 19, 22, 23],
    [18, 17, 16, 16, 15, 14, 13, 12, 11, 12, 12, 13, 14, 14, 15, 16, 17, 18, 20, 22],
    [19, 18, 17, 16, 15, 14, 14, 13, 12, 11, 12, 12, 13, 14, 15, 15, 16, 17, 20, 22],
    [19, 19, 18, 17, 16, 15, 14, 14, 13, 12, 11, 12, 12, 13, 14, 15, 15, 17, 19, 21],
    [20, 19, 18, 18, 17, 16, 15, 14, 13, 12, 12, 11, 12, 12, 13, 14, 15, 16, 18, 20],
    [21, 20, 19, 18, 17, 16, 16, 15, 14, 13, 12, 12, 11, 12, 13, 13, 14, 15, 18, 20],
    [21, 21, 20, 19, 18, 17, 16, 16, 14, 14, 13, 12, 12, 11, 12, 13, 14, 15, 17, 19],
    [22, 22, 21, 20, 19, 18, 17, 17, 15, 15, 14, 13, 13, 12, 11, 12, 13, 14, 16, 18],
    [23, 22, 21, 21, 20, 19, 18, 17, 16, 15, 15, 14, 13, 13, 12, 11, 12, 13, 15, 17],
    [24, 23, 22, 22, 21, 20, 19, 18, 17, 16, 15, 15, 14, 14, 13, 12, 11, 12, 15, 16],
    [25, 24, 23, 23, 22, 21, 20, 19, 18, 17, 17, 16, 15, 15, 14, 13, 12, 11, 13, 15],
    [27, 27, 26, 25, 24, 23, 22, 22, 20, 20, 19, 18, 18, 17, 16, 15, 15, 13, 11, 13],
    [29, 29, 28, 27, 26, 25, 24, 23, 22, 22, 21, 20, 20, 19, 18, 17, 16, 15, 13, 11]
]
export const FAIR_MATRIX_REG: number[][] = [
    [0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30, 30],
    [15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30],
    [15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30],
    [15, 15, 15, 0, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30],
    [15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30],
    [15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30, 30],
    [20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 30, 30],
    [20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 30, 30],
    [20, 20, 20, 20, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 30],
    [20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 15, 20, 20, 20, 30],
    [20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 15, 20, 20, 20],
    [20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20, 20],
    [30, 20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 15, 20, 20],
    [30, 30, 20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 20, 20],
    [30, 30, 30, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 15, 0, 15, 15, 15, 20, 20],
    [30, 30, 30, 30, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 15, 0, 15, 15, 15, 20],
    [30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 15, 0, 15, 15, 20],
    [30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15, 0, 15, 15],
    [30, 30, 30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 20, 20, 20, 15, 15, 15, 0, 15],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 20, 20, 20, 15, 15, 15, 15, 0]
]

export const LANDMARKS: Map<StationName, string[]> = new Map<StationName, string[]>()
LANDMARKS.set(StationName.baclaran, ["Baclaran Church", "Ninoy Aquino International Airport", "Coastal Mall", "Bus terminal to Cavite"])
LANDMARKS.set(StationName.edsa, ["Transfer to MRT-3", "Metropoint Mall", "Heritage Hotel", "Pasay Rotonda", "Nearest link to the SM Mall of Asia"])
LANDMARKS.set(StationName.libertad, ["Pure Gold", "Libertad Market", "Cuneta Astrodome", "Department of Foreign Affairs", "Holy Trinity Church", "St. Mary's Academy", "Rizal Funeral", "Sta.Clara Parish", "Pasay City Hall", "Ayala - Libertad jeepney route"])
LANDMARKS.set(StationName.gil_puyat, ["Cartimar", "Philippine Law School", "Pasay City Academy", "Manila Adventist Medical Center", "EGI Mall", "Buendia PNR Station"])
LANDMARKS.set(StationName.vito_cruz, ["Bangko Sentral ng Pilipinas", "Harrison Plaza", "University Mall", "Rizal Memorial Sports Complex", "De La Salle University", "De La Salle - College of St. Benilde", "Arellano University", "St. Scholastica's College"])
LANDMARKS.set(StationName.quirino, ["Manila Zoo", "Remedios Circle", "Adriatico Street"])
LANDMARKS.set(StationName.pedro_gil, ["Robinsons Ermita", "Philippine General Hospital", "University of the Philippines - Manila"])
LANDMARKS.set(StationName.un_ave, ["Rizal Park", "Luneta", "Supreme Court of the Philippines", "Department of Tourism", "Department of Justice", "Manila Ocean Park", "Quirino Grandstand", "Times Square Shopping Mall", "Adamson Univesity", "Emilio Aguinaldo College", "Manila Science High School", "Pearl Manila Hotel", "Manila Doctors Hospital", "Medical Center Manila"])
LANDMARKS.set(StationName.central, ["Arroceros", "Pasig River", "Intramuros", "Manila Metropolitan Theater", "Manila City Hall", "Office of the Ombudsman", "National Museum of the Philippines", "Department of Labor and Employment", "Philippine Veterans Affairs Office", "SM City Manila", "Colegio De San Juan de Letran", "Pamantasan ng Lungsod ng Maynila (PLM)", "Mapua Institute of Technology", "Lyceum of the Philippines University"])
LANDMARKS.set(StationName.carriedo, ["Pasig River", "Quiapo Church", "Escolta", "Ongpin", "Binondo", "Binondo Church", "China Town", "Manila Mini-Forest Park", "Liwasang Bonifacio", "Manila Central Post Office", "Pasig River Ferry Line via Escolta Station"])
LANDMARKS.set(StationName.doroteo_jose, ["Transfer to LRT-2", "Fabella Memorial Hospital", "Isetann Shopping Center", "Link to the University Belt", "Manila City Jail"])
LANDMARKS.set(StationName.bambang, ["Jose Reyes Memorial Medical Center", "San Lazaro Hospital", "Link to University of Santo Tomas"])
LANDMARKS.set(StationName.tayuman, ["SM City San Lazaro", "Link to University of Santo Tomas"])
LANDMARKS.set(StationName.blumentritt, ["SM City San Lazaro", "Blumentritt PNR Station"])
LANDMARKS.set(StationName.abad_santos, ["Manila Chinese Cemetery"])
LANDMARKS.set(StationName.r_papa, ["Manila Chinese Cemetery", "St. Pancratius Parish"])
LANDMARKS.set(StationName.fifth_ave, ['Taoist Temple', 'Hernandez Hospital', 'Jade Towers', 'Yorklin Chinese School'])
LANDMARKS.set(StationName.monumento, ['Monumento Circle', 'Bonifacio Monument', 'Grace Park', 'Rizal Avenue corner EDSA', 'Uniwide', 'Ever Gotesco', 'Manila Central University (MCU)'])
LANDMARKS.set(StationName.balintawak, ["Balintawak Market", "Caloocan-Quezon City boundary", "EDSA-Cloverleaf Interchange", "Andres Bonifacio Monument and Parks", "A. Bonifacio Drive", "NLEX exit"])
LANDMARKS.set(StationName.roosevelt, ["Waltermart North EDSA Mall", "Jackman Plaza Emporium Muñoz", "Muñoz Market", "STI College Muñoz-EDSA", "Iglesia Ni Cristo Bago Bantay", "Congressional Arcade Building", "S&R Congressional", "AMA Computer University", "Quezon City General Hospital"])

export function lookStation(station: StationName): Station {
    return STATIONS.find(s => s.shortName == station)
}
export function findNorth(station: StationName): StationName {
    return STATION_ORDER_SHORT[STATION_ORDER_SHORT.findIndex(s => s == station) + 1]
}
export function findSouth(station: StationName): StationName {
    return STATION_ORDER_SHORT[STATION_ORDER_SHORT.findIndex(s => s == station) - 1]
}

export function stationOrder(station: StationName): number {
    return STATION_ORDER_SHORT.indexOf(station)
}
export function findStation(fuzzyStation: string, threshold: number): StationName[] {
    fuzzyStation = (fuzzyStation || "").trim().replace(new RegExp(" +"), "_").toLowerCase()
    threshold = threshold || 0

    let list: [number, string, StationName][] = []

    let keywordIdMapping: { [keyword: string]: StationName } = {}
    for (let station of STATIONS) {
        keywordIdMapping[station.shortName] = station.shortName
        keywordIdMapping[station.longName] = station.shortName
        if (station.altNames) {
            station.altNames.forEach(altName => keywordIdMapping[altName] = station.shortName)
        }
    }

    let keywords: string[] = Object.keys(keywordIdMapping)
    let keyscores = keywords.map(key => stringSimilarity.compareTwoStrings(fuzzyStation, key))

    let stationSimilarity = new Map<StationName, number>();
    for (let i in keywords) {
        let keyword = keywords[i]
        let keyscore = keyscores[i]

        if (keyscore < threshold) {
            continue;
        }

        let id = keywordIdMapping[keyword]

        let currentScore = stationSimilarity.get(id)
        if (!currentScore || currentScore < keyscore) {
            stationSimilarity.set(id, keyscore)
        }
    }

    let rankings: { id: StationName, score: number }[] = []
    for (let [id, score] of stationSimilarity.entries()) {
        rankings.push({
            id: id,
            score: score
        })
    }

    return rankings.sort((a, b) => b.score - a.score).map(r => r.id)
}

export function fairCost(from: StationName, to: StationName, isBeepCard?: boolean): number {
    if (isBeepCard)
        return FAIR_MATRIX_BEEP[stationOrder(from)][stationOrder(to)]
    return FAIR_MATRIX_REG[stationOrder(from)][stationOrder(to)]
}

export function landmarks(station: StationName): string[] {
    return LANDMARKS.get(station) || []
}