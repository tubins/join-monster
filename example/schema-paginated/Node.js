import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

import joinMonster from '../../src/index'
const options = {
  minify: process.env.MINIFY == 1
}
if (knex.client.config.client === 'mysql') {
  options.dialect = 'mysql'
} else if (knex.client.config.client === 'pg') {
  options.dialect = 'pg'
}

import dbCall from '../data/fetch'
import knex from './database'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, context, resolveInfo) => {
    const { type, id } = fromGlobalId(globalId)
    return joinMonster.getNode(type, resolveInfo, context, parseInt(id),
      sql => dbCall(sql, knex, context),
      options
    )
  },
  obj => obj.__type__
)

export { nodeInterface, nodeField }
