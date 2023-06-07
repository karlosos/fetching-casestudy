import { AsyncThunkCreateForm } from "./createAsyncThunk-create-form"
import { AsyncThunkFetching } from "./createAsyncThunk-fetching"

export const AsyncThunkView = () => {
    return (
        <>
            <AsyncThunkCreateForm /> <br />
            <AsyncThunkFetching />
        </>
    )
}