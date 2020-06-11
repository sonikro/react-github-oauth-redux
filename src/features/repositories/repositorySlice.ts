import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GithubApi } from "../../api/Github";
import { AuthenticationSlice } from "../authentication/authenticationSlice";


export interface RepositorySlice {
    repositories: Array<any>;
    loading: boolean;
}

const initialState: RepositorySlice = {
    repositories: [],
    loading: false
}

export const fetchRepositories = createAsyncThunk(
    "repositories/fetchRepositories",
    async (arg, thunkApi) => {
        const authSlice: AuthenticationSlice = (thunkApi.getState() as any).authentication
        const githubApi = new GithubApi(authSlice.token)
        const repo: Array<any> = await githubApi.listMyRepos()
        return repo;
    }
)

const repositorySlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        setRepositories: (state, action: PayloadAction<Array<any>>) => {
            state.repositories = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepositories.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchRepositories.fulfilled, (state, {payload}) => {
            state.loading = false
            state.repositories = payload
        })
    }
})

export const {setLoading, setRepositories} = repositorySlice.actions;

export const loadingSelector = (state: {repositories: RepositorySlice}) => state.repositories.loading
export const repositoriesSelector = (state: {repositories: RepositorySlice}) => state.repositories.repositories

export default repositorySlice.reducer;
