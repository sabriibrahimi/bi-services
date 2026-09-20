import { hasFormService, site } from '../config/site.js'

/**
 * All contact-form submission logic lives behind this one function.
 *
 * Configure the back-end in src/config/site.js:
 *   form.provider = 'formspree'  + form.formspreeEndpoint = 'https://formspree.io/f/xxxx'
 *   form.provider = 'netlify'    + form.netlifyFormName   = 'contact'
 *
 * While no provider is configured the function refuses to pretend: it returns
 * { status: 'not-configured' } and the UI asks the visitor to call or write.
 *
 * Returns: { status: 'success' | 'error' | 'not-configured', error?: Error }
 */
export async function submitContactForm(values) {
  if (!hasFormService) {
    return { status: 'not-configured' }
  }

  try {
    if (site.form.provider === 'formspree') {
      return await submitToFormspree(values)
    }
    if (site.form.provider === 'netlify') {
      return await submitToNetlify(values)
    }
    return { status: 'not-configured' }
  } catch (error) {
    return { status: 'error', error }
  }
}

/** Shared payload, including the uploaded photographs. */
function toFormData(values) {
  const data = new FormData()
  data.append('name', values.name)
  data.append('email', values.email)
  if (values.phone) data.append('phone', values.phone)
  if (values.workType) data.append('workType', values.workType)
  if (values.surface) data.append('surface', values.surface)
  data.append('message', values.message)
  values.files?.forEach((file, index) => {
    data.append(`photo-${index + 1}`, file, file.name)
  })
  return data
}

async function submitToFormspree(values) {
  const response = await fetch(site.form.formspreeEndpoint, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: toFormData(values),
  })

  if (!response.ok) {
    return { status: 'error', error: new Error(`Formspree responded ${response.status}`) }
  }
  return { status: 'success' }
}

async function submitToNetlify(values) {
  const data = toFormData(values)
  data.append('form-name', site.form.netlifyFormName)

  const response = await fetch('/', { method: 'POST', body: data })

  if (!response.ok) {
    return { status: 'error', error: new Error(`Netlify responded ${response.status}`) }
  }
  return { status: 'success' }
}

export default submitContactForm
