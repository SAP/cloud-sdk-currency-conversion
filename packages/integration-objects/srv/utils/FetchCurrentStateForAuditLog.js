/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
async function fetchCurrentAttributeValues(req, tenantID, tableName) {
  const query = SELECT.from(tableName).where({ tenantID }).and({ ID: req.data.ID });
  const tx = cds.transaction(req);
  const affectedRows = await tx.run(query);
  if (affectedRows.length > 0) {
    return affectedRows[0];
  }
}

module.exports = {
  fetchCurrentAttributeValues
};
