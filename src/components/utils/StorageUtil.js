const PROVIDER = "provider";
const REF_ADDRESS = "referral_address";

export const getProvider = () =>
	localStorage.getItem(PROVIDER) ? localStorage.getItem(PROVIDER) : "";
export const setProvider = (value) => localStorage.setItem(PROVIDER, value);
export const removeProvider = () => localStorage.removeItem(PROVIDER);

export const getRefAddress = () =>
	localStorage.getItem(REF_ADDRESS) ? localStorage.getItem(REF_ADDRESS) : "";
export const setRefAddress = (value) =>
	localStorage.setItem(REF_ADDRESS, value);
export const removeRefAddress = () => localStorage.removeItem(REF_ADDRESS);
