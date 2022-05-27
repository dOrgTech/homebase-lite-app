import { NetworkType } from "services/beacon"
import { DAOListItem } from "./types"
import { GET_ALL_DAOS_QUERY } from "./gql/queries"
import { client } from "./gql/client"

export interface GetAllDAOsDTO {
  daos: DAOListItem[]
}

export const getAllDAOs = async (network: NetworkType) => {
  const response = await client.request<GetAllDAOsDTO>(GET_ALL_DAOS_QUERY, {
    network
  })

  return response.daos
}
