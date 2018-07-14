"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = {
    google: {
        maps: {
            apiKey: "AIzaSyBpERBr8CsN1Cs_atrlpiIUIrC9CV1tnd4",
            distanceMatrix: {
                mode: "walking",
                units: "metric"
            }
        }
    },
    debug: false,
    locationConstraint: "Metro Manila, Philippines"
};
exports.GMAPS_CLIENT = require('@google/maps').createClient({
    key: exports.CONFIG.google.maps.apiKey,
    Promise: require("promise")
});
exports.DATA = {
    "Taft Ave Ext, Pasay, Metro Manila": ["RTW? Head over to Jhocelynz RTW for the latest fashion imported from Hong-Kong, Bangladesh, and Sri Langka."],
    "Taft Ave, Pasay, 1300 Metro Manila": ["Need a break from your commute? Stop by Metropoint mall to shop and dine!"],
    "Antonio S. Arnaiz Ave, Pasay, Metro Manila": ["Lapit mga suki! At halinat lumahok sa super suki raffle promo at manalo ng 1,000,000. Promo runs until July 30, 2018."],
    "2741 Taft Ave Pasay City, Pasay, Metro Manila": ["Bus lines from Buendia to Balibago, Lucena, etc. Visit Jac Liner now."],
    "Malate, Manila, 1004 Metro Manila": ["From here on its Bonchon! Enjoy our Korean Style Chicken with a buddy! Buy 1 Take 1 for all chicken flavors. Promo runs until July 30, 2018."],
    "Taft Avenue cor Pres. Elpidio Quirino Avenue, Malate, Manila 1004": ["Tiis-tipid? Sa halagang P50.00 makaka jollisaver meal ka na! Sulit-sarap meals, only at Jollibee."],
    "Taft Avenue cor. Pedro Gil Street, Ermita, Manila 1000": ["Pay day sale! Get up to 50% off in select items from the department store! Head over to Robinsons Manila. Promo runs until July 30, 2018."],
    "Taft Avenue cor. General Luna St. and United Nations Avenue, Ermita, Manila 1000": ["Enjoy your family day in Manila Ocean Park! Use the voucher code: LRTMOP2018 to enjoy 50% off on your visit to Manila Ocean Park."],
    "Arroceros Street, Ermita, Manila": ["Pay day sale! Get up to 50% off in select items from the department store! Head over to SM City Manila. Promo runs until July 30, 2018."],
    "Carriedo St, Quiapo, Manila, 1001 Metro Manila": ["Craving for Chinese food? Head over to Mr. Ong's Chinese Restaurant and enjoy the finest Chinese food in town."],
    "Rizal Avenue cor. Doroteo Jose St. Santa Cruz, Manila": ["Looking for a place to stay around D. Jose station? The Grand Opera Hotel is offering a promo 50% off their rooms. Just use the voucher code LRTGOH2018. Promo runs until July 30, 2018!"],
    "1367 Rizal Avenue cor. Bambang St., Santa Cruz, Manila 1003": ["Bang! Bang! Natamaan ka ba ng bala? Dont worry nandito ang Jose Reyes Memorial Medical Center para sayo! We hope to serve you!"],
    "1921 Rizal Avenue cor. Tayuman Street, Santa Cruz, Manila 1014": ["Pay day sale! Get up to 50% off in select items from the department store! Head over to SM City San Lazaro"],
    "Rizal Avenue cor. New Antipolo and Blumentritt Road Sta. Cruz, Manila": ["Pay day sale! Get up to 50% off in select items from the department store! Head over to SM City San Lazaro"],
    "Rizal Avenue cor. Abad Santos Avenue, Bgy. 208 Zone 019 Manuguit, Tondo, Manila": ["Dont wait till the time comes! Apply for a St. Peter Life Plan now. Visit our nearest center."],
    "3405 Rizal Avenue Extension cor. Ricardo Papa Street, Brgy. Obrero, Tondo, Manila 1013": ["Dont wait till the time comes! Apply for a St. Peter Life Plan now. Visit our nearest center."],
    "242 Rizal Avenue Extension cor. 5th Avenue (C-3), Grace Park East, Caloocan 1403": ["5th! 5th! Nasagasaan ka ba ng Jeep? Dont worry! Nandito ang Hernandez Hospital para sayo. We hope to serve you soon!"],
    "706 Rizal Avenue Extension, Grace Park East, Caloocan 1403": ["A university at the center of Manila! Manila Central University (MCU) is now accepting applications for the second semester."],
    "1179 Epifanio de los Santos Avenue, Brgy. Apolonio Samson, Balintawak, Quezon City 1106": ["Lapit mga suki! Dito na sa Balintawak Market para sa pangunahin mong bilihin sa presyong abot kaya!"],
    "1039 Epifanio de los Santos Avenue cor. Roosevelt Avenue and Congressional Ave., Brgy. Ramon Magsaysay, Bago Bantay, Quezon City 1105": ["Pay day sale! Get up to 50% off in select items from the department store! Head over to Waltermart North EDSA"]
};
function provideAds(session, place, meterRadius, chance) {
    let adsAdresses = Object.keys(exports.DATA);
    return exports.GMAPS_CLIENT.distanceMatrix({
        origins: [place + " " + exports.CONFIG.locationConstraint],
        destinations: adsAdresses,
        mode: exports.CONFIG.google.maps.distanceMatrix.mode,
        units: exports.CONFIG.google.maps.distanceMatrix.units
    }).asPromise().then(gres => {
        if (exports.CONFIG.debug) {
            console.log("GMaps Client DistanceMatrix Response for ADS:");
            console.log(JSON.stringify(gres, null, 4));
        }
        let json = gres.json;
        let origin = json.origin_addresses[0] + "";
        if (origin == "") {
            // throw new Error("Please be specific on the location");
            return;
        }
        let elements = json.rows[0].elements;
        if (elements[0].status == "NOT_FOUND") {
            // throw new Error("The location cannot be reached from any train stations")
            return;
        }
        let validAddresses = [];
        elements.forEach((element, index) => {
            if (element.distance.value < meterRadius) {
                validAddresses.push(adsAdresses[index]);
            }
        });
        if (validAddresses.length && Math.random() < chance) {
            let randIndex = Math.floor(Math.random() * validAddresses.length);
            let address = validAddresses[randIndex];
            session.send(exports.DATA[address]);
        }
    }).catch(err => {
        if (exports.CONFIG.debug) {
            console.error(JSON.stringify(err, null, 4));
        }
    });
}
exports.provideAds = provideAds;
