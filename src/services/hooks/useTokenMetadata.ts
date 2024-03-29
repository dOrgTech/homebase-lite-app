import { useQuery } from "react-query";
import { getTokenMetadata } from "services/bakingBad/tokenBalances";

import { useTezos } from "services/beacon/hooks/useTezos";

export const useTokenMetadata = (address?: string) => {
  const { tezos, network } = useTezos();

  const result = useQuery<any, Error>(
    ["tokenMetadata", address],
    () => getTokenMetadata(address as string, network),
    {
      enabled: !!tezos && !!address,
    }
  );

  return result;
};
