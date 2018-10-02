const serviceMethods = require('./serviceMethods');

var exports = module.exports = {};

exports.getCardData = (filter) => {
    var jsondata = {};

    jsondata = [
        { "value": 0, "caption": "1080p50", "style": "enum_normal" },
        { "value": 1, "caption": "1080p60", "style": "enum_warning" },
        { "value": 2, "caption": "N/A", "style": "enum_alarm" }
    ];

    return Promise.resolve(JSON.stringify(jsondata));
};

exports.getLibraryData = (filter) => {
    var jsondata = {};
    var num1 = 9;
    var result = serviceMethods.mult(num1, 2);

    jsondata = '{"equation":"' + num1 + ' x 2","result":"' + result + '"}';

    return Promise.resolve(JSON.stringify(jsondata));
};

exports.getRagStatus = (status) => {

    var jsondata = {};
    var value = serviceMethods.rag(status);

    jsondata = { "colour": value };

    return Promise.resolve(JSON.stringify(jsondata));
};

exports.getPanelAttributes = () => {

    var jsondata = {};

    jsondata = [{
        "_id": 1,
        "name": "panel1",
        "cards": [{ "name": "card1", "status": serviceMethods.rag(1) },
        { "name": "card2", "status": serviceMethods.rag(1) },
        { "name": "card3", "status": serviceMethods.rag(3) }
        ]
    },
    {
        "_id": 2,
        "name": "panel2",
        "cards": [{ "name": "card1", "status": serviceMethods.rag(1) },
        { "name": "card2", "status": serviceMethods.rag(2) },
        { "name": "card3", "status": serviceMethods.rag(3) }
        ]
    },
    {
        "_id": 3,
        "name": "panel3",
        "cards": [{ "name": "card1", "status": serviceMethods.rag(1) },
        { "name": "card2", "status": serviceMethods.rag(1) },
        { "name": "card3", "status": serviceMethods.rag(1) }
        ]
    }];

    return Promise.resolve(JSON.stringify(jsondata));
};

exports.getProducts = (filter) => {

    var jsondata = {};

    jsondata = [{
        "_id": 1,
        "productName": "high-waist-slim-mom-jeans-in-jacinta",
        "productDescription": "1976 501 Jeans",
        "productImage": {
            "src": "http://images.asos-media.com/products/asos-farleigh-high-waist-slim-mom-jeans-in-jacinta-pretty-mid-wash/7948167-1-jacintaprettymid?$XL$",
            "shortDesc": "high-waist-slim-mom-jeans-in-jacinta",
            "width": 116,
            "height": 148,
        },
        "productPrice": 185
    },
    {
        "_id": 2,
        "productName": "Man Levi",
        "productDescription": "501 Original Fit Jeans",
        "productImage": {
            "src": "http://lsco.scene7.com/is/image/lsco/Levi/clothing/005010114-front-pdp.jpg",
            "shortDesc": "short description here",
            "width": 116,
            "height": 148,
        },
        "productPrice": 125
    },
    {
        "_id": 3,
        "productName": "Bootleg Jeans",
        "productDescription": "501 Bootleg Jeans",
        "productImage": {
            "src": "https://mosaic01.ztat.net/vgs/media/pdp-zoom/LE/22/2G/06/AK/12/LE222G06A-K12@11.jpg",
            "shortDesc": "short description here",
            "width": 116,
            "height": 148,
        },
        "productPrice": 95
    }];

    return Promise.resolve(JSON.stringify(jsondata));

};

exports.getProjectCommissionsByMonth = (searchStr) => {

    // declare json object
    var jsondata = {};

    // hard code data structure pending development of service
    jsondata = {
        "startDate": "2016-04-01T00:00:00",
        "endDate": "2017-03-31T00:00:00",
        "projects": [{
            "projectId": 1,
            "projectTitle": "Project one",
            "costsPerMonth": [1.234, 23.45, 345.6, 0, 0, 0, 0, 0, 0, 0, 0, 123],
            "totalCost": 7158
        },
        {
            "projectId": 2,
            "projectTitle": "Project two",
            "costsPerMonth": [345.6, 12.34, 2.345, 0, 0, 0, 0, 0, 0, 0, 0, 321],
            "totalCost": 8517
        }
        ]
    }

    return Promise.resolve(JSON.stringify(jsondata));

}