/** @jsx jsx */
import { jsx, Flex, Box, Image, Styled, Button } from "theme-ui";
import { Link } from "../components";
// import { useEffect } from "react";
import moment from "moment";

const parseDate = date => {
  return moment(date).format("MMM YYYY");
};

const IsOngoing = ({ isOngoing, startDate, endDate }) => {
  return parseDate(startDate).concat(
    " - ",
    !isOngoing ? parseDate(endDate) : "Present"
  );
};

// const addGrade = grade => {
//   return grade ? " \u00B7 Grade: ".concat(grade) : null;
// };

const styling = {
  mt: 0,
  mb: 0,
};

const greyedOut = {
  opacity: "0.9",
};

export const Row = ({ editing, openEditor, id, children }) => {
  const sectionStyling = {
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
    border: "2px solid #aaa",
    borderRadius: "5px",
    p: "1em",
    flex: "1 1 auto",
    transition: "0.3s all ease",
    flexDirection: "column",
    "&:hover": editing
      ? {
          transform: "scale(1.05)",
          cursor: "pointer",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
        }
      : undefined,
  };

  const handleClick = () => {
    openEditor();
  };

  return (
    <Flex key={id.toString()} sx={sectionStyling} onClick={handleClick}>
      {children}
    </Flex>
  );
};

export const Education = ({ editing, openEditor, contents, media, id }) => {
  const {
    school,
    degree,
    fieldOfStudy,
    location,
    grade,
    isOngoing,
    startDate,
    endDate,
    description,
  } = contents;

  return (
    <Row {...{ editing, openEditor, id }}>
      <Styled.h3 sx={styling}>{school}</Styled.h3>
      <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
        {[degree, fieldOfStudy, grade ? "Grade: ".concat(grade) : ""].join(
          " \u00B7 "
        )}
      </Styled.h4>

      <Styled.p sx={{ ...styling, ...greyedOut, mt: "1em" }}>
        <IsOngoing {...{ isOngoing, startDate, endDate }} />
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut, mb: "1em" }}>
        {location}
      </Styled.p>

      <Styled.p sx={{ ...styling, mb: "1em" }}>{description}</Styled.p>
    </Row>
  );
};

export const Experience = ({ editing, openEditor, contents, media, id }) => {
  const {
    jobTitle,
    organisation,
    department,
    location,
    employmentType,
    isVoluntary,
    isOngoing,
    startDate,
    endDate,
    description,
  } = contents;

  return (
    <Row {...{ editing, openEditor, id }}>
      <Styled.h3 sx={styling}>{jobTitle}</Styled.h3>
      <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
        {[organisation, department].join(" \u00B7 ")}
      </Styled.h4>

      <Styled.p sx={{ ...styling, ...greyedOut, mt: "1em" }}>
        <IsOngoing {...{ isOngoing, startDate, endDate }} />
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut }}>
        {[employmentType, isVoluntary ? "Is Volunteering" : ""].join(
          " \u00B7 "
        )}
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut, mb: "1em" }}>
        {location}
      </Styled.p>

      <Styled.p sx={{ ...styling, mb: "1em" }}>{description}</Styled.p>
    </Row>
  );
};

// Orientation refers to that of the artefact/feature, it is one of - left, right and center
// For now media is URL -> i.e. an image's url.
export const Display = ({ openEditor, contents, id, media, editing }) => {
  const {
    orientation,
    body,
    header,
    actionText,
    actionUrl,
  } = contents;

  console.log(orientation);
  // var bodyOrientation = {};
  // if (orientation === "right") {
  //   bodyOrientation = {
  //     hPos: "left",
  //     vPos: "center",
  //   };
  // } else if (orientation === "left") {
  //   bodyOrientation = {
  //     hPos: "right",
  //     vPos: "center",
  //   };
  // } else if (orientation === "center") {
  //   bodyOrientation = {
  //     hPos: "center",
  //     vPos: "center",
  //   };
  // }

  const MediaCollection = () => {
    const mediaStyle = {
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
      maxWidth:"390px"
    };

    const mediaCollectionStyle = {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      backgroundColor: "muted",
      borderRadius: "5px",
    };

    const Media = ({ url, description, type, filename, id, setPreview }) => {
      if (type === "image") {
        return <Image key={id.toString()} sx={mediaStyle} src={url} />;
      }
    };

    return (
      <Box sx={mediaCollectionStyle}>
        {media.map(item => (
          <Media {...item} key={item.id} />
        ))}
      </Box>
    );
  };

  // const artefactStyle = {
  //   mr: "5em",
  //   ml: "5em",
  //   mb: "2em",
  //   boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
  //   border: "2px solid #aaa",
  //   borderRadius: "5px",
  //   p: "1em",
  //   transition: "0.3s all ease",
  //   "&:hover": editing
  //     ? {
  //         transform: "scale(1.05)",
  //         cursor: "pointer",
  //         boxShadow:
  //           "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
  //       }
  //     : undefined,
  // };

  // const bodyComponent = (
  //   <Body
  //     hPos={bodyOrientation.hPos}
  //     vPos={bodyOrientation.vPos}
  //     body={body}
  //     header={header}
  //   />
  // );

  const action =
    actionUrl === "" ||
    actionUrl === undefined ||
    actionText === "" ||
    actionText === undefined ? null : (
      <Button
        as={Link}
        href={actionUrl}
        sx={{ bg: "primary", color: "background", p: 2, alignSelf: "center" }}
      >
        {actionText}
      </Button>
    );

  const bodyComponent =
    action || header || body ? (
      <Flex sx={{ flex:"1", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ flexDirection:"column"}}>
          {header ? <Styled.h3>{header}</Styled.h3> : null}
          {body ? <Styled.p>{body}</Styled.p> : null}
          {action}
        </Box>
      </Flex>
    ) : null;

  const children =
    orientation === "right" ? (
      <Flex>
        <MediaCollection />
        {bodyComponent}
      </Flex>
    ) : orientation === "left" ? (
      <Flex>
        {bodyComponent}
        <MediaCollection />
      </Flex>
    ) : orientation === "center" ? (
      <Flex>
        {bodyComponent}
        {/* TODO: background media collection */}
        {/* <MediaCollection onClick={handleClick} /> */}
      </Flex>
    ) : null;

  return <Row {...{ editing, openEditor, id }}>{children}</Row>;
};
