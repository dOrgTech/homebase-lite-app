import { BigNumber } from "bignumber.js";
import blockies from "blockies-ts";

const b582int = (val: string): string => {
  let rv = new BigNumber(0);
  const alpha = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  for (let i = 0; i < val.length; i++) {
    rv = rv.plus(
      new BigNumber(alpha.indexOf(val[val.length - 1 - i])).multipliedBy(new BigNumber(alpha.length).exponentiatedBy(i))
    );
  }

  return rv.toString(16);
};

export const toShortAddress = (address: string, limit = 4): string => {
  return address
    .slice(0, limit)
    .concat("...")
    .concat(address.slice(address.length - limit, address.length));
};

export const getBlockie = (address: string): string => {
  if (address.startsWith("tz") || address.startsWith("kt")) {
    return blockies
      .create({
        seed: `0${b582int(address)}`,
        spotcolor: "#000",
      })
      .toDataURL();
  }

  return blockies.create({ seed: address }).toDataURL();
};
