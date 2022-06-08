import { types } from '../../types'
const mockTypes = {
  login: '[auth] LOGIN',
  logout: '[auth] LOGOUT',

  uiSetError: '[ui] SET_ERROR',
  uiRemoveError: '[ui] REMOVE_ERROR',

  uiStartLoading: '[UI] Start loading',
  uiFinishLoading: '[UI] Finish loading',

  notesAddNew: '[notes] ADD_NEW',
  notesActive: '[notes] SET_ACTIVE',
  notesLoad: '[notes] LOAD',
  notesUpdate: '[notes] UPDATE',
  notesFileUpload: '[notes] FILE_UPLOAD',
  notesDelete: '[notes] DELETE',
  notesLogoutCleanUp: '[notes] LOGOUT_CLEAN_UP'
}

describe('types', () => {
  it('should export a types object', () => {
    expect(types).toBeDefined()
  })
  it('should have the correct types', () => {
    expect(types).toEqual(mockTypes)
  })
})
