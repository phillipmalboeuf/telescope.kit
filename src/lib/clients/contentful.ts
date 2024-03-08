import contentful from 'contentful'

const preview = true
export const content = contentful.createClient({
  space: '2g43ft9kwm8s',
  environment: '2.0',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? '9ncKYNaOEDCcxwbukziNiRI7WdFhk1-g057bTsNiS40' : 'rDDr4skd_pn69p2aeK4fBIgheqjD3m0Wmf3hUBebhK8',
}).withoutUnresolvableLinks