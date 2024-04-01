//@ts-nocheck
const maxFreeImages = 30;
const minimumAmountOfTokens = 1_000_000;
const dailyCredits = 30;

const remainingCredits = (walletBalance, generatedImagesCount) => {
    if (isPremiumUser(walletBalance)) return { credits: dailyCredits, isOverLimit: false };

    return { credits: remainingFreeLimit(generatedImagesCount), isOverLimit: isOverFreeLimit(walletBalance, generatedImagesCount) };
};

const shouldGenerateImage = (walletBalance, generatedImagesCount) => {
    // has required amount of tokens
    if (isPremiumUser(walletBalance)) return true;
    // over free trial limit
    if (isFreeUser(walletBalance) && isOverFreeLimit(walletBalance, generatedImagesCount)) return false;
    // if(isMidTierUser(walletBalance) && remainingDailyCredits(generatedImagesCount) > 0) 
    return true // TODO: revisit
};

const remainingFreeLimit = (generatedImagesCount) => {
    if (generatedImagesCount > maxFreeImages) return 0;
    let diff = generatedImagesCount - maxFreeImages;
    return Math.abs(diff);
};

const isMidTierUser = (walletBalance) => !isPremiumUser(walletBalance) && !isFreeUser(walletBalance) && walletBalance != '0' && Number(walletBalance);
const remainingDailyCredits = (generatedImagesCount) => Math.abs(generatedImagesCount - dailyCredits); // TODO: revisit

const isOverFreeLimit = (walletBalance, generatedImagesCount) =>
    isPremiumUser(walletBalance) ? false : remainingFreeLimit(generatedImagesCount) <= 0;
const isPremiumUser = (walletBalance) => walletBalance != '0' && Number(walletBalance) >= minimumAmountOfTokens;
const isFreeUser = (walletBalance) => walletBalance == '0';

export { shouldGenerateImage, remainingCredits, isMidTierUser, maxFreeImages, minimumAmountOfTokens };
