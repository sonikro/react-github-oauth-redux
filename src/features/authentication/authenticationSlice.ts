import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationSlice {
    authenticated: boolean
    token: string
    authError: string
    loading: boolean
}

export const exchangeTokens = createAsyncThunk(
    "authentication/exchangeTokens",
    async (authCode: string) => {
        const response = await fetch(
            `http://localhost:3001/token?code=${authCode}`
        ).then(response => response.json());
        if (response.error) {
            throw Error(response);
        }
        const token = response.access_token;
        sessionStorage.setItem("token", token);
        window.location.href = "/"
        return token
    }
)
const initialState: AuthenticationSlice = {
    authenticated: false,
    token: "",
    authError: "",
    loading: false
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.authenticated = action.payload
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.authError = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(exchangeTokens.pending, (state, { payload }) => {
            state.loading = true
            state.authError = ""
            state.authenticated = false
        })

        builder.addCase(exchangeTokens.fulfilled, (state, { payload }) => {
            state.loading = false
            state.authenticated = true
            state.authError = ""
            state.token = payload
        })

        builder.addCase(exchangeTokens.rejected, (state, { payload }) => {
            state.loading = false
            state.authenticated = false
            state.authError = JSON.stringify(payload)
            state.token = ""
        })
    }
});

export const authenticatedSelector = (state: { authentication: AuthenticationSlice }) => state.authentication.authenticated

export const { setAuthError, setAuthenticated, setLoading, setToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
