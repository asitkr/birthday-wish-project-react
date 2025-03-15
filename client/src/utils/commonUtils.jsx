export const getUserNameForHeader = (fullName) => {
    if (!fullName) return "";

    const nameParts = fullName?.trim().split(" ");
    if (nameParts?.length === 1) return nameParts[0][0]?.toUpperCase();

    const firstInitial = nameParts[0][0].toUpperCase();
    const lastInitial = nameParts[nameParts?.length - 1][0]?.toUpperCase();

    return `${firstInitial}${lastInitial}`;
};

export const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/`;
};

// Function to get cookies manually
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split("; ");
    for (let cookie of cookiesArray) {
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
};
