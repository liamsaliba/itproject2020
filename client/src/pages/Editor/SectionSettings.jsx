/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Icon } from "semantic-ui-react";
import { changePortfolioTheme, selectCurrentUserPortfolio } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
import { useReducer } from "react";
function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAR_LOG":
      return { ...state, log: [] };
    case "OPEN_MODAL":
      return {
        log: [
          {
            event: action.event,
            date: new Date().toLocaleTimeString(),
            name: action.name,
            value: true,
          },
          ...state.log,
        ],
        open: true,
      };
    case "CLOSE_MODAL":
      return {
        log: [
          {
            event: action.event,
            date: new Date().toLocaleTimeString(),
            name: action.name,
            value: true,
          },
          ...state.log,
        ],
        open: false,
      };
    default:
      throw new Error();
  }
}

function ModalDeleteAccount() {
  const [state, dispatch] = useReducer(exampleReducer, {
    log: [],
    open: false,
  });
  const { open } = state;

  return (
    <Modal
      onOpen={e =>
        dispatch({ event: e.type, name: "onOpen", type: "OPEN_MODAL" })
      }
      onClose={e =>
        dispatch({ event: e.type, name: "onClose", type: "CLOSE_MODAL" })
      }
      open={open}
      trigger={
        <Button color="red">
          <Icon name="warning sign" />
          Delete Portfolio
        </Button>
      }
    >
      <Modal.Header>Delete Your Portfolio</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Are you sure you want to delete your portfolio? Enter your username
          and password to verify.
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={e =>
            dispatch({
              event: e.type,
              name: "onClick",
              type: "CLOSE_MODAL",
            })
          }
          negative
        >
          No
        </Button>
        <Button
          onClick={e =>
            dispatch({
              event: e.type,
              name: "onClick",
              type: "CLOSE_MODAL",
            })
          }
          positive
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const SectionSettings = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const setTheme = theme => dispatch(changePortfolioTheme(theme));

  return (
    <Section name="Settings" icon="settings">
      <div>
        <Icon name="paint brush" />
        Theme
        <ThemeSelector theme={portfolio.theme} setTheme={setTheme} />
      </div>
      <br />
      <div>
        <ModalDeleteAccount />
      </div>
    </Section>
  );
};
export default SectionSettings;
