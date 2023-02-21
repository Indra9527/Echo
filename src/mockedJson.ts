const file: { [key: string]: any[][] } = {
  "test.csv": [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
  ],
  "people.csv": [
    ["name", "email", "address", "phone", "region", "country"],
    [
      "Tasha Ferguson",
      "tellus.lorem@google.ca",
      "P.O. Box 628, 4292 Enim Road",
      "(564) 478-2571",
      "Haute-Normandie",
      "Costa Rica",
    ],
    [
      "Harriet Ryan",
      "luctus.ipsum@aol.org",
      "6607 Dignissim. Rd.",
      "(225) 734-4032",
      "West Region",
      "Russian Federation",
    ],
    [
      "Elaine Kennedy",
      "turpis@aol.edu",
      "P.O. Box 220, 5461 Tristique Ave",
      "(210) 838-4033",
      "Podkarpackie",
      "Ireland",
    ],
    [
      "Liberty Talley",
      "adipiscing.lobortis@yahoo.couk",
      "8786 Pharetra Road",
      "1-714-824-3132",
      "Special Region of Yogyakarta",
      "Singapore",
    ],
    [
      "Jerome Foley",
      "odio.sagittis.semper@icloud.couk",
      "Ap #788-1986 Molestie Road",
      "1-751-965-1253",
      "Rio Grande do Sul",
      "France",
    ],
  ],
};

const searchData: { [key: string]: any[][] } = {
  t: [["The", "song", "remains", "the", "same."]],
  p: [
    [
      "Tasha Ferguson",
      "tellus.lorem@google.ca",
      "P.O. Box 628, 4292 Enim Road",
      "(564) 478-2571",
      "Haute-Normandie",
      "Costa Rica",
    ],
  ],
};

const queryData: { [key: string]: any[][] } = {
  not: [
    ["name", "email", "address", "phone", "region", "country"],
    [
      "Harriet Ryan",
      "luctus.ipsum@aol.org",
      "6607 Dignissim. Rd.",
      "(225) 734-4032",
      "West Region",
      "Russian Federation",
    ],
    [
      "Elaine Kennedy",
      "turpis@aol.edu",
      "P.O. Box 220, 5461 Tristique Ave",
      "(210) 838-4033",
      "Podkarpackie",
      "Ireland",
    ],
    [
      "Liberty Talley",
      "adipiscing.lobortis@yahoo.couk",
      "8786 Pharetra Road",
      "1-714-824-3132",
      "Special Region of Yogyakarta",
      "Singapore",
    ],
    [
      "Jerome Foley",
      "odio.sagittis.semper@icloud.couk",
      "Ap #788-1986 Molestie Road",
      "1-751-965-1253",
      "Rio Grande do Sul",
      "France",
    ],
  ],
  and: [
    [
      "Jerome Foley",
      "odio.sagittis.semper@icloud.couk",
      "Ap #788-1986 Molestie Road",
      "1-751-965-1253",
      "Rio Grande do Sul",
      "France",
    ],
  ],
};

export { file, searchData, queryData };
