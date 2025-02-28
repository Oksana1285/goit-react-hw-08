import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectFilter } from './filtersSlice';
import { addContact, deleteContact, fetchContacts } from './contactsOps';

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handlePending = state => {
  state.loading = true;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;

export const selectContactsFiltered = createSelector(
  [selectContacts, selectFilter],
  (contacts, nameFilter) =>
    contacts?.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter?.toLowerCase())
    )
);
