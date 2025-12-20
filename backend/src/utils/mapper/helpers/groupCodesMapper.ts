const retentionGroupDays = {
  MS: {
    M2: {
      'martidelala19:00-en(ts)': 'BS-MS-Year 2 Module 2-TS, Tuesday, 19:00', // Debate
      'miercuridelala19:00-en(av)':
        'BS-MS-Year 2 Module 2-AV, Wednesday, 19:00', // Debate
      'joidela19:00-en(ao)': 'BS-MS-Year 2 Module 2-AO, Thursday, 19:00', // Debate
      'martidelala19:00-en(mt)': 'BS-MS-Year 1 Module 2-MT, Tuesday, 19:00', // PS
    },
    M3: {
      'lunidela19:00la20:30-en(bp)':
        'BS-MS-Year 2 Module 3-BP, Monday, 19:00', // Debate
      // ANULAT: 'miercuridelala19:00la20:30-ro(bp)': 'BS-MS-Year 2 Module 3 RO-BP, Wednesday, 19:00', // Debate
    },
    M4: {
      'martidelala19:15la20:45(ao)':
        'BS-MS-Year 2 Module 4-AO, Tuesday, 19:15', // Debate
    },
  },
  HS: {
    M2: {
      'lunidela19:00la20:30(tm)':
        'BS-HS-Year 1 Module 2-TM, Monday, 19:00', // Debate
      'martidela19:00la20:30(mt)':
        'BS-HS-Year 1 Module 2-MT, Tuesday, 19:00', // PS
    },
    M3: {
      // ANULAT: 'martidela19:00la20:30(av)': 'BS-HS-Year 2 Module 3-AV, Tuesday, 19:00', // Debate
      'joidela19:00la20:30(coman)':
        'BS-HS-Year 2 Module 3-COMAN, Thursday, 19:00', // Debate
    },
    M4: {
      // ANULAT: 'lunidela09:00la10:30(coman)': 'BS-HS-Year 2 Module 4-COMAN, Monday, 09:00', // Debate
      'joidela19:00la20:30(mt)':
        'BS-HS-Year 2 Module 4-MT, Thursday, 19:00', // Debate
    },
    M6: {
      'lunidela19:00la20:30(ts)':
        'BS-HS-Year 3 Module 6-TS, Monday, 19:00', // Debate
    },
    M8: {
      'marțidela19:30la21:00(mt)':
        'BS-HS-Year 4 Module 8-MT, Tuesday, 19:30', // Debate
    },
  },
};

const newcomersGroupDays = {
  MS: {
    M1: {      
        'lunidelaora09:00la10:30(cu)-engleză':
          'BS-MS-Year 1 Module 1-CU, Monday, 09:00',
       // Debate
      
        'miercuridelaora19:00la20:30(bp)-engleză':
          'BS-MS-Year 1 Module 1-BP, Wednesday, 19:00',
       // Debate
      
        'lunidelaora19:00la20:30(ts)-engleză':
          'BS-MS-Year 1 Module 1-TS, Monday, 19:00',
       // Debate

        'lunidelaora19:00la20:30-lb.română(ar)':
          'BS-MS-Year 1 Module 1-AR, Monday, 19:00',
       // PS
      
        'martidelaora19:15la20:45-lb.engleză(tb)':
          'BS-MS-Year 1 Module 1-TB, Tuesday, 19:15',
       // PS
    },
  },
  HS: {
    M1: {
      'joidela19:00la20:30(vn)-engleză':
        'BS-HS-Year 1 Module 1-VN, Thursday, 19:00', // Debate
      'miercuridimineațadela09:00la10:30(coman)-engleză':
        'BS-HS-Year 1 Module 1-COMAN, Wednesday, 09:00',
      // Debate

      'marțisearadela19:00(av)-engleză':
        'BS-HS-Year 1 Module 1-AV, Tuesday, 19:00',

      'miercuridela19:00la20:30-en(ic)':
        'BS-HS-Year 1 Module 1-IC, Wednesday, 19:00',
      // PS

      'joidela19:00la20:30-en(mt)':
        'BS-HS-Year 1 Module 1-MT, Thursday, 19:00',
      // PS
    },
  },
};

export default function groupCodesMapper(
  schoolLevel: string,
  courseModule: string,
  days: string[],
): string[] {
  console.log('🔍 Mapping group codes for: ', schoolLevel, courseModule, days);
  if (courseModule === "M1") {
    const groupCodes = days.map((day: string) => {
      //lowercase and remove space from day 
      const dayFormatted = day.toLowerCase().replace(/\s+/g, '');
      console.log('🔍 Day formatted: ', dayFormatted);
      return newcomersGroupDays[schoolLevel][courseModule][dayFormatted];
    });
    console.log('🔍 Group codes: ', groupCodes);
    return groupCodes;
  } else {
    const groupCodes = days.map((day: string) => retentionGroupDays[schoolLevel][courseModule][day]);
    console.log('🔍 Group codes: ', groupCodes);
    return groupCodes;
  }
}
