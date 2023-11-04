export const formatTweetText = (tweet) => {
    let formattedText = tweet.text;
    const entities = [];

    // Get all mentions and hashtags from the tweet's entities and store them in one array
    tweet.entities.mentions.forEach(mention => {
        entities.push({
            type: 'mention',
            value: `@${mention.username}`,
            start: mention.indices[0],
            end: mention.indices[1]
        });
    });

    tweet.entities.hashtags.forEach(hashtag => {
        entities.push({
            type: 'hashtag',
            value: `#${hashtag.text}`,
            start: hashtag.indices[0],
            end: hashtag.indices[1]
        });
    });

    // Sort entities by start index
    entities.sort((a, b) => a.start - b.start);

    const jsxParts = [];
    let lastIndex = 0;

    entities.forEach(entity => {
        // Add text before the entity
        jsxParts.push(formattedText.substring(lastIndex, entity.start));

        // Add the entity as a link
        if (entity.type === 'mention') {
            jsxParts.push(<a href={`/users/${entity.value.substring(1)}`}>{entity.value}</a>);
        } else if (entity.type === 'hashtag') {
            jsxParts.push(<a href={`/hashtags/${entity.value.substring(1)}`}>{entity.value}</a>);
        }

        lastIndex = entity.end;
    });

    // Add remaining text after the last entity
    jsxParts.push(formattedText.substring(lastIndex));

    return jsxParts;
};
