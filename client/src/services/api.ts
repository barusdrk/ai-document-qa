import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:3001",
});

/* --------------------------------------------------
 * Authentication
 * -------------------------------------------------- */

export function setAuthToken(
  token: string | null
) {
  if (token) {
    API.defaults.headers.common.Authorization =
      `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
}

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

/* --------------------------------------------------
 * User
 * -------------------------------------------------- */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/* --------------------------------------------------
 * Upload
 * -------------------------------------------------- */

export interface UploadResponse {
  documentId: string;
  chunks: number;
  pages: number;
}

/* --------------------------------------------------
 * Documents
 * -------------------------------------------------- */

export interface DocumentSummary {
  documentId: string;
  fileName: string;
  originalName: string;
  pageCount: number;
  chunkCount: number;
  questionCount: number;
  fileSize: number;
  createdAt: string;
  lastAccessed: string;
}

/* --------------------------------------------------
 * Questions
 * -------------------------------------------------- */

export interface Source {
  page: number;
  text: string;
}

export interface AskResponse {
  answer: string;
  sources: Source[];
}

/* --------------------------------------------------
 * Dashboard
 * -------------------------------------------------- */

export interface DashboardStats {
  documents: number;
  chunks: number;
  questions: number;
  storage: number;
}

export interface ActivityDay {
  label: string;
  uploads: number;
  questions: number;
}

export interface StorageLimits {
  storageUsed: number;
  storageLimit: number;
  storageRemaining: number;
}

export interface DashboardResponse {
  user: User;

  stats: DashboardStats;

  recentDocuments:
    DocumentSummary[];

  activity: ActivityDay[];

  limits: StorageLimits;
}

/* --------------------------------------------------
 * Search
 * -------------------------------------------------- */

export interface SearchResult {
  documentId: string;
  fileName: string;
  page: number;
  text: string;
  score: number;
}

export interface SearchResponse {
  matches: SearchResult[];
}

/* --------------------------------------------------
 * Auth API
 * -------------------------------------------------- */

export async function register(
  payload: RegisterRequest
): Promise<AuthResponse> {
  const { data } =
    await API.post<AuthResponse>(
      "/auth/register",
      payload
    );

  setAuthToken(data.token);

  return data;
}

export async function login(
  payload: LoginRequest
): Promise<AuthResponse> {
  const { data } =
    await API.post<AuthResponse>(
      "/auth/login",
      payload
    );

  setAuthToken(data.token);

  return data;
}

/* --------------------------------------------------
 * Upload API
 * -------------------------------------------------- */

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const form =
    new FormData();

  form.append("file", file);

  const { data } =
    await API.post<UploadResponse>(
      "/upload",
      form,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return data;
}

export async function uploadText(
  text: string
): Promise<UploadResponse> {
  const { data } =
    await API.post<UploadResponse>(
      "/upload",
      { text }
    );

  return data;
}

/* --------------------------------------------------
 * Questions API
 * -------------------------------------------------- */

export async function askQuestion(
  documentId: string,
  question: string
): Promise<AskResponse> {
  const { data } =
    await API.post<AskResponse>(
      "/ask",
      {
        documentId,
        question,
      }
    );

  return data;
}

/* --------------------------------------------------
 * Dashboard API
 * -------------------------------------------------- */

export async function getDashboard(): Promise<DashboardResponse> {
  const { data } =
    await API.get<DashboardResponse>(
      "/dashboard"
    );

  return data;
}

/* --------------------------------------------------
 * Documents API
 * -------------------------------------------------- */

export async function getDocuments(): Promise<
  DocumentSummary[]
> {
  const { data } =
    await API.get<
      DocumentSummary[]
    >("/documents");

  return data;
}

export async function getDocument(
  documentId: string
): Promise<DocumentSummary> {
  const { data } =
    await API.get<DocumentSummary>(
      `/documents/${documentId}`
    );

  return data;
}

export async function deleteDocument(
  documentId: string
): Promise<void> {
  await API.delete(
    `/documents/${documentId}`
  );
}

/* --------------------------------------------------
 * Search API
 * -------------------------------------------------- */

export async function searchDocument(
  documentId: string,
  query: string
): Promise<SearchResponse> {
  const { data } =
    await API.get<SearchResponse>(
      `/documents/${documentId}/search`,
      {
        params: {
          q: query,
        },
      }
    );

  return data;
}

export async function searchDocuments(
  query: string
): Promise<SearchResult[]> {
  const { data } =
    await API.get<
      SearchResult[]
    >("/documents/search", {
      params: {
        q: query,
      },
    });

  return data;
}

export default API;
