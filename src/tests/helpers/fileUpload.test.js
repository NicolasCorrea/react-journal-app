import { fileUpload } from '../../helpers'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'dz1rtv3wd',
  api_key: '276562669617582',
  api_secret: 'VJJ2-nGPLwLLM222dFiayl6rRLs',
  secure: true
})

describe('helpers/fileUpload', () => {
  it('should export a fileUpload function', () => {
    expect(fileUpload).toBeDefined()
  })

  it('should return a promise', () => {
    const result = fileUpload()
    expect(result).toBeInstanceOf(Promise)
  })

  it('should upload a file and return the URL', async done => {
    const response = await fetch(
      'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=1662595200&v=beta&t=MhLLpO0NbmYPZxeXQSZX5t2bbs2CWlO-H9KF7m9i9L0'
    )
    const file = new File([await response.blob()], 'test.jpg')
    const url = await fileUpload(file)
    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].slice(0, -4)
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done()
    })
  })
})
