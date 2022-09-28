const useIPFS = (hash, filename) => {
    return `https://gateway.ipfscdn.io/ipfs/${hash}?filename=${filename}`
    // return `https://gateway.ipfscdn.io/ipfs/${hash}`
};

export default useIPFS;
