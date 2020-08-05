INSERT INTO cards(api_id, atk, def, level, name, race, type, attribute, rarity, descrip, card_images) VALUES (
    ${api_id}, ${atk}, ${def}, ${level}, ${name}, ${race}, ${type}, ${attribute}, ${rarity}, ${desc}, ${card_images}
) RETURNING id;