import { Account, Client, ID, Query, Avatars, Databases, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.fuelwarden',
    projectId: '66f9a653003832a96cff',
    databaseId: '66f9a7ae001d04f53952',
    userCollectionId: '66f9a7d10032382bca38',
    productsCollectionId: '67007de60018aab8cde8',
    storageId: '66f9a8f7001fe4f3a3a4'
}

const {
  endpoint, 
  platform,
  projectId,
  databaseId,
  userCollectionId,
  productsCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

//Get all Posts
export const getAllPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      productsCollectionId
    )

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getProductsByCategory = async (category) => {
  try {
    const queries = [];

    // If "All" is selected, fetch all products
    if (category !== "All") {
      queries.push(`category=${category}`); // Filter by the selected category
    }

    const response = await databases.listDocuments(databaseID, productsCollectionId, queries);
    return response.documents; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};


export const getLatestPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      productsCollectionId
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    )

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}