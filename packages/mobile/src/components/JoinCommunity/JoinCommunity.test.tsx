import { renderComponent } from '../../utils/functions/renderComponent/renderComponent'
import { JoinCommunity } from './JoinCommunity.component'

describe('JoinCommunity component', () => {
  it('renders component', () => {
    const { toJSON } = renderComponent(
      <JoinCommunity
        joinCommunityAction={jest.fn()}
        redirectionAction={jest.fn()}
        networkCreated={false}
      />
    )
    expect(toJSON()).toMatchInlineSnapshot(`
      <View
        style={
          {
            "backgroundColor": "#ffffff",
            "flex": 1,
          }
        }
        testID="join-community-component"
      >
        <View
          onLayout={[Function]}
          style={
            {
              "flex": 1,
              "justifyContent": "center",
              "paddingLeft": 20,
              "paddingRight": 20,
            }
          }
        >
          <Text
            color="main"
            fontSize={24}
            fontWeight="medium"
            horizontalTextAlign="left"
            style={
              [
                {
                  "color": "#000000",
                  "fontFamily": "Rubik-Medium",
                  "fontSize": 24,
                  "textAlign": "left",
                  "textAlignVertical": "center",
                },
                {
                  "marginBottom": 30,
                },
              ]
            }
            verticalTextAlign="center"
          >
            Join community
          </Text>
          <View>
            <Text
              color="main"
              fontSize={14}
              horizontalTextAlign="left"
              style={
                [
                  {
                    "color": "#000000",
                    "fontFamily": "Rubik-Regular",
                    "fontSize": 14,
                    "textAlign": "left",
                    "textAlignVertical": "center",
                  },
                  {
                    "color": "#4C4C4C",
                    "paddingBottom": 10,
                  },
                ]
              }
              verticalTextAlign="center"
            >
              Paste your invite link to join an existing community
            </Text>
            <View
              accessibilityState={
                {
                  "busy": undefined,
                  "checked": undefined,
                  "disabled": false,
                  "expanded": undefined,
                  "selected": undefined,
                }
              }
              accessibilityValue={
                {
                  "max": undefined,
                  "min": undefined,
                  "now": undefined,
                  "text": undefined,
                }
              }
              accessible={true}
              collapsable={false}
              focusable={true}
              onBlur={[Function]}
              onClick={[Function]}
              onFocus={[Function]}
              onResponderGrant={[Function]}
              onResponderMove={[Function]}
              onResponderRelease={[Function]}
              onResponderTerminate={[Function]}
              onResponderTerminationRequest={[Function]}
              onStartShouldSetResponder={[Function]}
              style={
                [
                  {
                    "backgroundColor": "#ffffff",
                    "borderColor": "#B3B3B3",
                    "borderRadius": 4,
                    "borderWidth": 1,
                    "flexGrow": 1,
                    "height": 60,
                    "justifyContent": "center",
                    "paddingLeft": 15,
                    "paddingRight": 15,
                  },
                ]
              }
            >
              <TextInput
                editable={true}
                onChangeText={[Function]}
                placeholder="Invite link"
                style={
                  [
                    {
                      "paddingBottom": 12,
                      "paddingTop": 12,
                      "textAlignVertical": "center",
                    },
                  ]
                }
                testID="input"
              />
            </View>
          </View>
          <View
            style={
              {
                "marginTop": 32,
              }
            }
          >
            <View
              style={
                {
                  "alignItems": "flex-start",
                  "display": "flex",
                  "flex": 1,
                  "flexDirection": "row",
                  "flexWrap": "wrap",
                  "minHeight": 500,
                }
              }
            >
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                You
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                 
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                can
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                 
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                <Text
                  color="link"
                  fontSize={14}
                  horizontalTextAlign="left"
                  onPress={[Function]}
                  style={
                    [
                      {
                        "color": "#67BFD3",
                        "fontFamily": "Rubik-Regular",
                        "fontSize": 14,
                        "textAlign": "left",
                        "textAlignVertical": "center",
                      },
                    ]
                  }
                  verticalTextAlign="center"
                >
                  create a new community
                </Text>
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                 
              </Text>
              <Text
                color="main"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#000000",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                instead
              </Text>
            </View>
          </View>
          <View
            style={
              {
                "marginTop": 32,
              }
            }
          >
            <View
              accessibilityState={
                {
                  "busy": undefined,
                  "checked": undefined,
                  "disabled": undefined,
                  "expanded": undefined,
                  "selected": undefined,
                }
              }
              accessible={true}
              focusable={true}
              onClick={[Function]}
              onResponderGrant={[Function]}
              onResponderMove={[Function]}
              onResponderRelease={[Function]}
              onResponderTerminate={[Function]}
              onResponderTerminationRequest={[Function]}
              onStartShouldSetResponder={[Function]}
              style={
                {
                  "alignItems": "center",
                  "backgroundColor": "#521C74",
                  "borderRadius": 5,
                  "justifyContent": "center",
                  "marginVertical": 12,
                  "minHeight": 45,
                  "paddingVertical": 12,
                  "width": undefined,
                }
              }
              testID="button"
            >
              <Text
                color="white"
                fontSize={14}
                horizontalTextAlign="left"
                style={
                  [
                    {
                      "color": "#ffffff",
                      "fontFamily": "Rubik-Regular",
                      "fontSize": 14,
                      "textAlign": "left",
                      "textAlignVertical": "center",
                    },
                  ]
                }
                verticalTextAlign="center"
              >
                Continue
              </Text>
            </View>
          </View>
        </View>
      </View>
    `)
  })
})
