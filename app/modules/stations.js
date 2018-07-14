"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levenshtein_distance_1 = require("../utils/levenshtein_distance");
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
var StationName;
(function (StationName) {
    StationName["baclaran"] = "baclaran";
    StationName["edsa"] = "edsa";
    StationName["libertad"] = "libertad";
    StationName["gil_puyat"] = "gil_puyat";
    StationName["vito_cruz"] = "vito_cruz";
    StationName["quirino"] = "quirino";
    StationName["pedro_gil"] = "pedro_gil";
    StationName["un_ave"] = "un_ave";
    StationName["central"] = "central";
    StationName["carriedo"] = "carriedo";
    StationName["doroteo_jose"] = "doroteo_jose";
    StationName["bambang"] = "bambang";
    StationName["tayuman"] = "tayuman";
    StationName["blumentritt"] = "blumentritt";
    StationName["abad_santos"] = "abad_santos";
    StationName["r_papa"] = "r_papa";
    StationName["fifth_ave"] = "5th_ave";
    StationName["monumento"] = "monumento";
    StationName["balintawak"] = "balintawak";
    StationName["roosevelt"] = "roosevelt";
})(StationName = exports.StationName || (exports.StationName = {}));
var StationTrainState;
(function (StationTrainState) {
    StationTrainState["IsIn"] = "is_in";
    StationTrainState["JustLeft"] = "just_left";
})(StationTrainState = exports.StationTrainState || (exports.StationTrainState = {}));
exports.STATIONS = [
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
];
exports.STATION_ORDER = exports.STATIONS.map(s => s.shortName);
exports.FAIR_MATRIX_BEEP = [
    [],
    [],
    []
];
exports.FAIR_MATRIX_REG = [
    [],
    [],
    []
];
exports.LANDMARKS = new Map();
exports.LANDMARKS.set(StationName.baclaran, []);
exports.LANDMARKS.set(StationName.edsa, []);
exports.LANDMARKS.set(StationName.libertad, []);
exports.LANDMARKS.set(StationName.gil_puyat, []);
exports.LANDMARKS.set(StationName.vito_cruz, []);
exports.LANDMARKS.set(StationName.quirino, []);
exports.LANDMARKS.set(StationName.pedro_gil, []);
exports.LANDMARKS.set(StationName.un_ave, []);
exports.LANDMARKS.set(StationName.central, []);
exports.LANDMARKS.set(StationName.carriedo, []);
exports.LANDMARKS.set(StationName.doroteo_jose, []);
exports.LANDMARKS.set(StationName.bambang, []);
exports.LANDMARKS.set(StationName.tayuman, []);
exports.LANDMARKS.set(StationName.blumentritt, []);
exports.LANDMARKS.set(StationName.abad_santos, []);
exports.LANDMARKS.set(StationName.r_papa, []);
exports.LANDMARKS.set(StationName.fifth_ave, []);
exports.LANDMARKS.set(StationName.monumento, []);
exports.LANDMARKS.set(StationName.balintawak, []);
exports.LANDMARKS.set(StationName.roosevelt, []);
function station(station) {
    return exports.STATIONS.find(s => s.shortName == station);
}
exports.station = station;
function findNorth(station) {
    return exports.STATION_ORDER[exports.STATION_ORDER.findIndex(s => s == station) + 1];
}
exports.findNorth = findNorth;
function findSouth(station) {
    return exports.STATION_ORDER[exports.STATION_ORDER.findIndex(s => s == station) - 1];
}
exports.findSouth = findSouth;
function stationOrder(station) {
    return exports.STATION_ORDER.indexOf(station);
}
exports.stationOrder = stationOrder;
function FindStation(fuzzyStation) {
    fuzzyStation = (fuzzyStation || "").trim().replace(new RegExp(" +"), "_").toLowerCase();
    let list = [];
    for (let station of exports.STATIONS) {
        let id = station.shortName;
        list.push([levenshtein_distance_1.getLevenshteinDistance(fuzzyStation, station.shortName), station.shortName, id]);
        list.push([levenshtein_distance_1.getLevenshteinDistance(fuzzyStation, station.longName), station.longName, id]);
        if (station.altNames) {
            station.altNames.forEach(altName => list.push([levenshtein_distance_1.getLevenshteinDistance(fuzzyStation, altName), altName, id]));
        }
    }
    list = list.sort((a, b) => a[0] - b[0]);
    let ranking = [];
    list.forEach(r => {
        let shortName = r[2];
        if (ranking.indexOf(shortName) < 0) {
            ranking.push(shortName);
        }
    });
    return ranking;
}
exports.FindStation = FindStation;
function fairCost(from, to, isBeepCard) {
    if (isBeepCard)
        return exports.FAIR_MATRIX_BEEP[stationOrder(from)][stationOrder(to)];
    return exports.FAIR_MATRIX_REG[stationOrder(from)][stationOrder(to)];
}
exports.fairCost = fairCost;
function landmarks(station) {
    return exports.LANDMARKS.get(station) || [];
}
exports.landmarks = landmarks;
