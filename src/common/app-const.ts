import { SliderProps } from "@mui/material";
import { ChemistrySliderProps } from "../components/Slider/ChemistrySlider";

export const CONTENTS = {
    home: {},
    test: {},
    result: {},
    chemistry: {},
}

export const HEADERS_AXIOS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const USERS_EXAMPLE = [
    "udon1234",
    "우동1234",
]

export const TEST  = {
    leadership: {
        subTests: {
            leadership:
            {
                icon: "groups",
                sectionIndex: 0
            }
        }
    },
    schedule: {
        subTests: {
            schedule:
            {
                icon: "edit_calendar",
                sectionIndex: 1,
                airportPlace: 
                {
                    position: {
                        lat: 33.596306,
                        lng: 130.4293798,
                    },
                    label: '공항',
                    icon: 'flight',
                },
                examples: {
                    1: {
                        places: [
                            {
                                position: {
                                    lat: 33.5897988,
                                    lng: 130.4085279,
                                },
                                label: '캐널시티',
                                icon: 'shopping_cart',
                            },
                            {
                                position: {
                                    lat: 33.5932449,
                                    lng: 130.4020225,
                                },
                                label: '이치란\n본점',
                                icon: 'restaurant',
                            },
                        ],
                        zoom: 13.5,
                        center: { lat: 33.5900, lng: 130.415 },
                    },
                    2: {
                        places: [
                            {
                                position: {
                                    lat: 33.6133009,
                                    lng: 130.4307441,
                                },
                                label: '하쿠하쿠',
                                icon: 'museum',
                            },
                            {
                                position: {
                                    lat: 33.6147611,
                                    lng: 130.4216325,
                                },
                                label: '하코자키 궁',
                                icon: 'temple_buddhist',
                            },
                        ],
                        zoom: 13,
                        center: { lat: 33.5950, lng: 130.425 },
                    },
                    3: {
                        places: [
                            {
                                position: {
                                    lat: 33.5893684,
                                    lng: 130.4172629,
                                },
                                label: '한큐백화점\n하카타점',
                                icon: 'shopping_cart',
                            },
                            {
                                position: {
                                    lat: 33.5838392,
                                    lng: 130.4539866,
                                },
                                label: '덴푸라 히라오\n본점',
                                icon: 'restaurant',
                            },
                        ],
                        zoom: 13,
                        center: { lat: 33.5950, lng: 130.425 },
                    },
                    4: {
                        places: [
                            {
                                position: {
                                    lat: 33.5626837,
                                    lng: 130.3738197,
                                },
                                label: '유센테이',
                                icon: 'tour',
                            },
                            {
                                position: {
                                    lat: 33.5650103,
                                    lng: 130.4388288,
                                },
                                label: '건담 파크\n후쿠오카',
                                icon: 'tour',

                            },
                        ],
                        zoom: 12,
                        center: { lat: 33.5800, lng: 130.40 },
                    },
                    5: {
                        places: [
                            {
                                position: {
                                    lat: 33.5897904,
                                    lng: 130.3504891,
                                },
                                label: '후쿠오카시\n박물관',
                                icon: 'museum',
                            },
                            {
                                position: {
                                    lat: 33.5934691,
                                    lng: 130.3465043,
                                },
                                label: '모모치해변',
                                icon: 'beach_access',
                            },
                        ],
                        zoom: 12,
                        center: { lat: 33.5800, lng: 130.40 },
                    },
                }
            }
        }
    },
    budget: {
        subTests: {
            food:
            {
                icon: "restaurant",
                sectionIndex: 2,
                "examples": {
                    5000: "kyudong",
                    10000: "wantang",
                    15000: "ramen",
                    20000: "dumpling",
                    25000: "afternoon-tea",
                    30000: "sushi",
                    35000: "chili-crab",
                    40000: "yakitori",
                    45000: "hitsumabushi",
                    50000: "more",
                },
            }
        }
    },
    city: {
        subTests: {
            metropolis:
            {
                icon: "domain",
                sectionIndex: 3,
                examples: [
                    "tokyo",
                    "osaka",
                    "yokohama",
                    "hongkong",
                ],
            },
            history:
            {
                icon: "temple_buddhist",
                sectionIndex: 4,
                examples: [
                    "kyoto",
                    "nara",
                    "kamakura",
                ]
            },
            nature:
            {
                icon: "forest",
                sectionIndex: 5,
                examples: [
                    "shiretoko",
                    "yakushima",
                    "biei",
                ]
            },
        }
    },
}

export const RESULT = {
    sections : [ 'tripCharacter', 'city', 'chemistry' ]
};
export const CHEMISTRY = {
    sections : [ 'tripCharacter', 'leadership', 'chemistry' ]
};

export const CITY = {
    jp:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/",
        linkType: "travel-japan",
    },
    osaka:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/osaka/",
        linkType: "travel-japan",
    },
    yokohama:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/yokohama-and-around/",
        linkType: "travel-japan",
    },
    tokyo:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/tokyo/",
        linkType: "travel-japan",
    },
    // 삿포로
    kyoto:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/kyoto/",
        linkType: "travel-japan",
    },
    nara:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kansai/nara/",
        linkType: "travel-japan",
    },
    kamakura:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kanto/kanagawa/kamakura-and-around/",
        linkType: "travel-japan",
    },
    // 가와고에 가나자와
    shiretoko:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/spot/2143/",
        linkType: "travel-japan",
    },
    yakushima:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/destinations/kyushu/kagoshima/yakushima/",
        linkType: "travel-japan",
    },
    biei:
    {
        nation: "jp",
        link: "https://www.japan.travel/ko/spot/1890/",
        linkType: "travel-japan",
    },
    sapporo:
    {
        nation: "jp",
        link: "",
        linkType: "",
    },
    hongkong:
    {
        nation: "hk",
        link: "https://www.discoverhongkong.com/eng/index.html",
        linkType: "discovering-hongkong",
    },
}
export const NATION = {
    "jp": {
        flag: true
    },
    "hk": {
        flag: true
    },
    "kr": {
        flag: true
    },
    "sea": {
        flag: false
    },
}

export const SLIDERPROPS_TEST_BUDGET_FOOD : SliderProps = {
    step: 5000,
    min: 5000,
    max: 50000,
    "aria-label": "budget"
};

export const SLIDERPROPS_CHEMISTRY_BUDGET_FOOD : ChemistrySliderProps = {
    testIndex : { index: "budget", subIndex: "food" },
    step: 5000,
    min: 5000,
    max: 50000,
};