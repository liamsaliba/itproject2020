/** @jsx jsx */
import { jsx, Flex, Box, Image, Styled, Button, Embed } from "theme-ui";
import React from "react";
import { Link } from "../components";
// import { useEffect } from "react";
import moment from "moment";
import { Icon, Button as SemanticButton } from "semantic-ui-react";
import { Document, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const parseDate = date => {
  return moment(date).format("MMM YYYY");
};

const IsOngoing = ({ isOngoing, startDate, endDate }) => {
  return startDate
    ? parseDate(startDate).concat(
        " - ",
        endDate ? parseDate(endDate) : "Present"
      )
    : null;
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

export const Row = ({ editing, openEditor, id, children, style }) => {
  const sectionStyling = {
    ...style,
    // boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
    flex: "1 1 auto",
    transition: "0.3s all ease",
    flexDirection: "column",
    "&:hover": editing
      ? {
          border: "2px solid #aaa",
          borderRadius: "5px",
          // transform: "scale(1.05)",
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
    details,
    orientation,
    displayType,
    textAlign,
    displaySize,
  } = contents;

  const content = (
    <Box>
      <Styled.h3 sx={styling}>{school}</Styled.h3>
      <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
        {[degree, fieldOfStudy, grade ? "Grade: ".concat(grade) : ""]
          .filter(Boolean)
          .join(" \u00B7 ")}
      </Styled.h4>

      <Styled.p sx={{ ...styling, ...greyedOut, mt: "1em" }}>
        <IsOngoing {...{ isOngoing, startDate, endDate }} />
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut, mb: "1em" }}>
        {location}
      </Styled.p>
      {/* whitespace pre-wrap ensures \n turn into <br/> */}
      <Styled.p sx={{ ...styling, mb: "1em", whiteSpace: "pre-wrap" }}>
        {details}
      </Styled.p>
    </Box>
  );

  return (
    <StyledArtifact
      {...{
        openEditor,
        id,
        media,
        editing,
        orientation,
        displayType,
        textAlign,
        displaySize,
      }}
    >
      {content}
    </StyledArtifact>
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
    details,
    orientation,
    displayType,
    textAlign,
    displaySize,
  } = contents;

  const content = (
    <Box>
      <Styled.h3 sx={styling}>{jobTitle}</Styled.h3>
      <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
        {[organisation, department].filter(Boolean).join(" \u00B7 ")}
      </Styled.h4>

      <Styled.p sx={{ ...styling, ...greyedOut, mt: "1em" }}>
        <IsOngoing {...{ isOngoing, startDate, endDate }} />
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut }}>
        {employmentType} {isVoluntary ? " \u00B7 Volunteer" : null}
      </Styled.p>
      <Styled.p sx={{ ...styling, ...greyedOut, mb: "1em" }}>
        {location}
      </Styled.p>

      <Styled.p sx={{ ...styling, mb: "1em", whiteSpace: "pre-wrap" }}>
        {details}
      </Styled.p>
    </Box>
  );

  return (
    <StyledArtifact
      {...{
        openEditor,
        id,
        media,
        editing,
        orientation,
        displayType,
        textAlign,
        displaySize,
      }}
    >
      {content}
    </StyledArtifact>
  );
};

const sizeHeights = {
  auto: undefined,
  short: "200px",
  medium: "300px",
  tall: "500px",
  fullscreen: "100vh",
};

const MediaCollection = ({
  media,
  darken = false,
  displayType,
  mediaHeight,
}) => {
  const mediaStyle = {
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
    width: "100%",
    objectFit: displayType || "contain",
    height: mediaHeight,
  };

  const mediaCollectionStyle = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "muted",
    borderRadius: "5px",
    filter: darken ? "brightness(0.70)" : undefined,
  };

  const Media = ({ url, description, type, filename, id, setPreview }) => {
    console.log(type);
    if (type === "image") {
      return <Image key={id.toString()} sx={mediaStyle} src={url} />;
    }

    if (type === "pdf") {
      return <Document key={id.toString()} sx={mediaStyle} file={url} onLoadError={console.error}/>;
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

export const StyledArtifact = ({
  orientation,
  textAlign,
  displaySize,
  displayType,
  media,
  editing,
  openEditor,
  id,
  children: body,
}) => {
  const height =
    displaySize === undefined ? undefined : sizeHeights[displaySize];

  const flexAlign = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  const mainStyle = {
    height: height,
    minHeight: "100px",
    maxHeight: "900px",
    flexWrap: "wrap",
    "& > div": {
      // "@media screen and (min-width: 40em)": {
      //   flex: "1",
      // },
      "@media screen and (min-width: 50em)": {
        flex: "1",
      },
    },
  };
  const bodyComponent = body ? (
    <Flex
      sx={{
        alignItems: "center",
        p: "1em",
        height: height,
        textAlign: textAlign,
        justifyContent: flexAlign[textAlign],
      }}
    >
      {body}
    </Flex>
  ) : null;

  const children =
    orientation === "left" ? (
      <Flex sx={mainStyle}>
        <MediaCollection displayType={displayType} media={media} />
        {bodyComponent}
      </Flex>
    ) : orientation === "right" ? (
      <Flex sx={mainStyle}>
        {bodyComponent}
        <MediaCollection displayType={displayType} media={media} />
      </Flex>
    ) : orientation === "center" ? (
      <Flex
        sx={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: media.length !== 0 ? "gray" : undefined,
          ...mainStyle,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            zIndex: "1",
            color: media.length !== 0 ? "white" : undefined,
            "& h1, & h2, & h3, & p": {
              color: media.length !== 0 ? "white" : undefined,
            },
          }}
        >
          {bodyComponent}
        </Box>
        <Box
          sx={{
            position: "absolute",
            zIndex: "0",
            height: "auto",
            width: "100%",
          }}
        >
          <MediaCollection
            darken={bodyComponent !== null}
            media={media}
            mediaHeight={height}
            displayType={displayType}
          />
        </Box>
      </Flex>
    ) : null;

  return <Row {...{ editing, openEditor, id }}>{children}</Row>;
};

const Action = ({ actionUrl, actionText, editing }) => {
  if (
    actionUrl === "" ||
    actionUrl === undefined ||
    actionText === "" ||
    actionText === undefined
  )
    return null;

  return (
    <Button
      {...(editing ? {} : { as: Link })}
      href={actionUrl}
      sx={{ bg: "primary", color: "background", p: 2, alignSelf: "center" }}
    >
      {actionText}
    </Button>
  );
};

// Orientation refers to that of the artefact/feature, it is one of - left, right and center
// For now media is URL -> i.e. an image's url.
export const Display = ({ contents, openEditor, id, media, editing }) => {
  const {
    body,
    header,
    actionText,
    actionUrl,
    orientation,
    displayType,
    textAlign,
    displaySize,
  } = contents;

  return (
    <StyledArtifact
      {...{
        openEditor,
        id,
        media,
        editing,
        orientation,
        displayType,
        textAlign,
        displaySize,
      }}
    >
      <Box>
        {header ? (
          body ? (
            <Styled.h3>{header}</Styled.h3>
          ) : (
            <Styled.h1>{header}</Styled.h1>
          )
        ) : null}
        {body ? (
          <Styled.p sx={{ whiteSpace: "pre-wrap" }}>{body}</Styled.p>
        ) : null}
        <Action {...{ actionUrl, actionText, editing }} />
      </Box>
    </StyledArtifact>
  );
};

export const Embedded = ({ contents, openEditor, id, editing }) => {
  const { url } = contents;

  const editBtn = (
    <SemanticButton icon labelPosition="left" onClick={openEditor}>
      <Icon name="edit" />
      Edit embed below
    </SemanticButton>
  );

  return (
    // <StyledArtifact
    //   {...{
    //     openEditor,
    //     id,
    //     editing,
    //     displaySize,
    //   }}
    // >
    <React.Fragment>
      {editing ? editBtn : null}
      <Embed src={url ? url.replace("watch?v=", "embed/") : ""} />
    </React.Fragment>

    // </StyledArtifact>
  );
};
