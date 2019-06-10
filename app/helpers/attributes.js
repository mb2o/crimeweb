module.exports = {
  personAttributes: [
    'id',
    'age',
    'birthaddress',
    'birthcity',
    'birthdate',
    'birthname',
    'deathaddress',
    'deathcity',
    'deathdate',
    'firstname',
    'gender',
    'lastname',
    'nicknames',
    'photo',
    'remark',
    'is_deceased'
  ],
  crimeAttributes: ['id', 'remark', 'is_solved', 'committeddate'],
  countryAttributes: ['id', 'name', 'iso_alpha_2'],
  convictionAttributes: [
    'id',
    'duration',
    'tbs',
    'title',
    'verdictdate',
    'ecli',
    'acli_appeal',
    'casenumber'
  ]
};
