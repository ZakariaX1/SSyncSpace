import { prisma } from '../database/prisma.js';

async function main() {
    console.log('🌱 Seeding database...');

    // Create your Discord server
    const myGuild = await prisma.discordGuilds.upsert({
        where: { guildId: "552953312073220096" },
        update: {},
        create: {
            guildId: "552953312073220096",
            guildName: "SSundee",
            iconHash: "a_151f202b12b9a2db5009b4095a1cd51b",
            builtAt: new Date("2019-01-01") // Approximate creation date
        }
    });
    console.log(`📊 Created guild: ${myGuild.guildName}`);

    // Create your user
    const myUser = await prisma.discordUsers.upsert({
        where: { discordId: "377842014290575361" },
        update: {},
        create: {
            discordId: "377842014290575361",
            globalName: "zakariax",
            avatarHash: null,       // Will get this when I sign in on the site
            accountCreated: new Date("2017-08-11")
        }
    });
    console.log(`👤 Created user: ${myUser.globalName}`);


    // Add yourself to your guild as admin
    await prisma.discordGuildMembers.upsert({
        where: {
            userId_guildId: {
                userId: myUser.discordId,
                guildId: myGuild.guildId
            }
        },
        update: {},
        create: {
            userId: myUser.discordId,
            guildId: myGuild.guildId,
            roles: ["ADMIN"] // Give myself admin role
        }
    });
    console.log(`✅ Added ${myUser.globalName} to guild ${myGuild.guildName} as ADMIN`);

    // Create some test events
    const event1 = await prisma.discordEvents.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "Gaming Night",
            description: "Weekly gaming session with the community",
            pingMessage: "🎮 Gaming Night is starting! Join us for some fun!",
            scheduledFor: new Date("2025-11-15T20:00:00Z"),
            estimatedDuration: 120,
            hostId: myUser.discordId,
            guildId: myGuild.guildId,
            approvalStatus: "APPROVED",
            status: "SCHEDULED"
        }
    });

    const event2 = await prisma.discordEvents.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: "Movie Night",
            description: "Watch party for the latest blockbuster releases",
            pingMessage: "🍿 Movie Night is starting! Grab your popcorn!",
            scheduledFor: new Date("2025-11-20T19:00:00Z"),
            estimatedDuration: 180,
            hostId: myUser.discordId,
            guildId: myGuild.guildId,
            approvalStatus: "PENDING",
            status: "PERMISSION_PENDING"
        }
    });
    console.log(`🎉 Created ${await prisma.discordEvents.count()} events`);

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });