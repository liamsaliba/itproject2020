/** @jsx jsx */
import { jsx, Flex, Box, Image, Styled, Button } from "theme-ui";
import { Link } from "../components";
// import { useEffect } from "react";
import moment from "moment";

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
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
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
    textAlign,
    displaySize,
  } = contents;

  const content = (
    <Box>
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

      <Styled.p sx={{ ...styling, mb: "1em" }}>{details}</Styled.p>
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
    textAlign,
    displaySize,
  } = contents;

  const content = (
    <Box>
      <Styled.h3 sx={styling}>{jobTitle}</Styled.h3>
      <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
        {[organisation, department].join(" \u00B7 ")}
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

      <Styled.p sx={{ ...styling, mb: "1em" }}>{details}</Styled.p>
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

const MediaCollection = ({ media, darken = false }) => {
  const mediaStyle = {
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
    // maxWidth: "390px",
    filter: darken ? "brightness(0.95)" : undefined,
    width: "100%",
    height: "100%",
    objectFit: "cover",
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

export const StyledArtifact = ({
  orientation,
  textAlign,
  displaySize,
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

  const mainStyle = { height: height, minHeight: "100px", maxHeight: "900px" };

  const bodyComponent = body ? (
    <Flex
      sx={{
        flex: "1",
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
        <MediaCollection media={media} />
        {bodyComponent}
      </Flex>
    ) : orientation === "right" ? (
      <Flex sx={mainStyle}>
        {bodyComponent}
        <MediaCollection media={media} />
      </Flex>
    ) : orientation === "center" ? (
      <Flex
        sx={{
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
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
            sx={{
              filter: "blur(5px)",
            }}
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
        {body ? <Styled.p>{body}</Styled.p> : null}
        <Action {...{ actionUrl, actionText, editing }} />
      </Box>
    </StyledArtifact>
  );
};
