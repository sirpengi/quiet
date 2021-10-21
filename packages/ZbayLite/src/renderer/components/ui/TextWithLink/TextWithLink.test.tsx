import React from 'react'

import { renderComponent } from '../../../testUtils/renderComponent'
import { TextWithLink } from './TextWithLink'

describe('TextWithLink', () => {
  it('renders component', () => {
    const result = renderComponent(
      <TextWithLink
        text={'Here is simple text'}
        links={[
          {
            tag: 'simple',
            label: 'simple',
            action: () => {
              console.log('linked clicked')
            }
          }
        ]}
      />
    )
    expect(result.baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="MuiGrid-root"
          >
            <p
              class="MuiTypography-root MuiTypography-body1"
            >
              <span>
                Here
              </span>
              <span>
                 
              </span>
              <span>
                is
              </span>
              <span>
                 
              </span>
              <span>
                simple
              </span>
              <span>
                 
              </span>
              <span>
                text
              </span>
            </p>
          </div>
        </div>
      </body>
    `)
  })
})
