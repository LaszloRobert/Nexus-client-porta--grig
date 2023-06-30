import gableEx1 from "./assets/fedex/fes19-gables-01.jpg";
import gableEx2 from "./assets/fedex/fes19-gables-02.jpg";
import gableEx3 from "./assets/fedex/fes19-gables-03.jpg";
import gableEx4 from "./assets/fedex/fes19-gables-04.jpg";
import gableEx5 from "./assets/fedex/fes19-gables-05.jpg";
import gableEx6 from "./assets/fedex/fes19-gables-06.jpg";
//import gableEx7 from "./assets/fedex/fes19-gables-07.jpg";

import directionalPillars1 from "./assets/fedex/fes19-directional pillars-01.jpg";
import directionalPillars2 from "./assets/fedex/fes19-directional pillars-02.jpg";

import greenSigns1 from "./assets/fedex/fes19-Green Signs-36x36-01-01.jpg";
import greenSigns2 from "./assets/fedex/fes19-Green Signs-36x36-01-02.jpg";
import greenSigns3 from "./assets/fedex/fes19-Green Signs-36x36-01-03.jpg";

import locator2 from "./assets/fedex/fes19-Locator-02.jpg";
import locator3 from "./assets/fedex/fes19-Locator-03.jpg";
import locator4 from "./assets/fedex/fes19-Locator-04.jpg";
import locator5 from "./assets/fedex/fes19-Locator-05.jpg";
import locator6 from "./assets/fedex/fes19-Locator-06.jpg";
import locator7 from "./assets/fedex/fes19-Locator-07.jpg";
import locator8 from "./assets/fedex/fes19-Locator-08.jpg";
import locator9 from "./assets/fedex/fes19-Locator-09.jpg";

import restroom1 from "./assets/fedex/fes19-restroom sign-10x18-01.jpg";
import restroom2 from "./assets/fedex/fes19-restroom sign-10x18-02.jpg";
import restroom3 from "./assets/fedex/fes19-restroom sign-10x18-03.jpg";

import trailerSigns1 from "./assets/fedex/fes19-trailer signs-24x18-01.jpg";
import trailerSigns2 from "./assets/fedex/fes19-trailer signs-24x18-02.jpg";
import trailerSigns3 from "./assets/fedex/fes19-trailer signs-24x18-03.jpg";
import trailerSigns4 from "./assets/fedex/fes19-trailer signs-24x18-04.jpg";
import trailerSigns5 from "./assets/fedex/fes19-trailer signs-24x18-05.jpg";
import trailerSigns6 from "./assets/fedex/fes19-trailer signs-24x18-06.jpg";
import trailerSigns7 from "./assets/fedex/fes19-trailer signs-24x18-07.jpg";
import trailerSigns8 from "./assets/fedex/fes19-trailer signs-24x18-08.jpg";

import verizonKiosk1 from "./assets/fedex/fes19-verizon kiosk decals14x40-01.jpg";
import verizonKiosk2 from "./assets/fedex/fes19-verizon kiosk decals14x40-02.jpg";
import verizonKiosk3 from "./assets/fedex/fes19-verizon kiosk decals14x40-03.jpg";

export const fedexItems = [
  {
    order: 421,
    line: 4,
    description: "GREEN SIGNS",
    status: "APPROVED",
    version: "V6",
    dimensions:{
      width: 6,
      height: 3,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: greenSigns1,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: greenSigns2,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: greenSigns3,
            status: "APPROVED",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 422,
    line: 15,
    description: "RESTROOM DECALS",
    status: "REWORK",
    version: "V6",
    dimensions:{
      width: 6,
      height: 8,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: restroom1,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: restroom2,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: restroom3,
            status: "REWORK",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 426,
    line: 1,
    description: "DIRECTIONAL PILLARS",
    status: "REWORK",
    version: "V1",
    dimensions:{
      width: 36,
      height: 23,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: directionalPillars1,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: directionalPillars2,
            status: "REWORK",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 430,
    line: 10,
    description: "LOCATORS",
    status: "APPROVED",
    version: "V6",
    dimensions:{
      width: 12,
      height: 13,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator2,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator3,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator4,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 3,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator5,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 4,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator6,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 5,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator7,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 6,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator8,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 7,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: locator9,
            status: "APPROVED",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 432,
    line: 6,
    description: "GABLES",
    status: "REVIEW",
    version: "V3",
    dimensions:{
      width: 20,
      height: 9,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx1,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx2,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx3,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 3,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx4,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 4,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx5,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 5,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: gableEx6,
            status: "REVIEW",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 434,
    line: 7,
    description: "VERIZON KIOSK",
    status: "APPROVED",
    version: "V8",
    dimensions:{
      width: 61,
      height: 33,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: verizonKiosk1,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: verizonKiosk2,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: verizonKiosk3,
            status: "APPROVED",
            comments: []
          }
        ]
      }
    ]
  },
  {
    order: 437,
    line: 8,
    description: "TRAILER SIGNS",
    status: "REWORK",
    version: "V1",
    dimensions:{
      width: 22,
      height: 23,
      unit: 'IN'
    },
    assets: [
      {
        id: 0,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns1,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 1,
        approved: true,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns2,
            status: "APPROVED",
            comments: []
          }
        ]
      },
      {
        id: 2,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns3,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 3,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns4,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 4,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns5,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 5,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns6,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 6,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns7,
            status: "REWORK",
            comments: []
          }
        ]
      },
      {
        id: 7,
        approved: false,
        versions: [
          {
            id: 0,
            name: "VERSION",
            selected: true,
            image: trailerSigns8,
            status: "REWORK",
            comments: []
          }
        ]
      }
    ]
  }
];
