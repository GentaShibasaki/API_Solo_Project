const validateUsername = (sName) =>
  typeof sName === "string" && sName.replace(" ", "").length > 2;

module.exports = (knex, User) => {
  return (params) => {
    const sampleColumn1 = params.sampleColumn1;
    const sampleColumn2 = params.sampleColumn2;

    if (!validateUsername(sampleColumn1)) {
      return Promise.reject(
        new Error("Username must be provided, and be at least two characters")
      );
    }

    return knex("sample")
      .insert({ sampleColumn1: sampleColumn1.toLowerCase(), sampleColumn2: sampleColumn2.toLowerCase()})
      .then(() => {
        return knex("sample")
          .where({ sampleColumn1: sampleColumn1.toLowerCase() })
          .select();
      })
      .then((sample) => new sample(sample.pop())) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That username already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
