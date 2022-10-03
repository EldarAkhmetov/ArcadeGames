const express = require("express");
const { User } = require("../back/models");
const { Op } = require("sequelize");
const cors = require("cors");
const {
    checkField,
    mapCagesToField,
    generateCages,
    getBlankField,
    mapCagesFromHittedField,
    findCage,
    getCageCoords,
    checkIsWin,
    hitByPc,
} = require("./game");
const app = express();
const port = 2999;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Sea battle api started");
});

app.post("/myStats", async (req, res) => {
    let { login } = req.body;
    let user = await User.findOne({
        where: {
            login: {
                [Op.eq]: login,
            },
        },
    });
    await res.json(user);
});

app.get("/bestPlayers", async (req, res) => {
    let users = await User.findAll({
        where: {
            games: {
                [Op.gt]: 100,
            },
        },
        order: [["games", "DESC"]],
    });
    await res.json(users);
});

app.post("/signIn", async (req, res) => {
    let { login, password } = req.body;
    let user = await User.findOne({
        where: {
            login: {
                [Op.eq]: login,
            },
        },
    });
    if (!user || user.password !== password) {
        await res.status(403).send("Wrong password or login");
    } else {
        await res.json(user);
    }
});

app.post("/signUp", async (req, res) => {
    let { login, password } = req.body;
    let userExist = await User.findOne({
        where: {
            login: {
                [Op.eq]: login,
            },
        },
    });
    if (userExist) {
        await res.status(403).send("User already exists");
    } else {
        let user = await User.create({
            login,
            password,
            games: 0,
            wins: 0,
            cage1: 0,
            cage2: 0,
            cage3: 0,
            cage4: 0,
            mineEasy: 0,
            mineNormal: 0,
            mineHard: 0,
            mineEasyWin: 0,
            mineNormalWin: 0,
            mineHardWin: 0
        });
        await res.json(user.login);
    }
});

app.post("/start", async (req, res) => {
    let { login, cages } = req.body;
    if (this["sessions"] && this["sessions"][login] && this["sessions"][login]["gamerCages"]) {
        let user = await User.findOne({
            where: {
                login: {
                    [Op.eq]: login,
                },
            },
        });
        user.games++;
        await user.save();
    }
    if (!checkField(cages)) await res.json("wrong field");
    else {
        cages.forEach((cage, i) => {
            cage.index = i + 11;
        });
        let gamerField = mapCagesToField(cages);
        let pcCages = generateCages();
        let pcField = getBlankField();
        this["sessions"] = {
            [login]: {
                gamerCages: cages,
                gamerField,
                pcCages,
                pcField,
            },
        };
        await res.json({ gamerField, pcField });
    }
});

app.post("/hit", async (req, res) => {
    let { login, coord } = req.body;
    let gamerField = this["sessions"][login]["gamerField"];
    let gamerCages = this["sessions"][login]["gamerCages"];
    let pcCages = this["sessions"][login]["pcCages"];
    let pcField = this["sessions"][login]["pcField"];
    let isWin = false;
    let isLose = false;
    let filledPcField = mapCagesFromHittedField(pcCages, pcField);

    if (pcField[coord[0]][coord[1]] === 0) {
        if (filledPcField[coord[0]][coord[1]] > 10 && filledPcField[coord[0]][coord[1]] < 21) {
            let cage = findCage(pcCages, filledPcField[coord[0]][coord[1]]);
            cage.hitted++;
            if (cage.hitted >= cage.level) {
                let coords = getCageCoords(cage);
                coords.forEach((crd) => {
                    pcField[crd[0]][crd[1]] = 6;
                });
                isWin = checkIsWin(pcCages);
                let user = await User.findOne({
                    where: {
                        login: {
                            [Op.eq]: login,
                        },
                    },
                });
                if (user) {
                    user[cage.type]++;
                    if (isWin) {
                        user.wins++;
                        user.games++;
                        this["sessions"][login] = {};
                    }
                    await user.save();
                }
            } else {
                pcField[coord[0]][coord[1]] = 5;
            }
        } else {
            pcField[coord[0]][coord[1]] = 7;
            hitByPc(gamerCages, gamerField);
            isLose = checkIsWin(gamerCages);
            if (isLose) {
                let user = await User.findOne({
                    where: {
                        login: {
                            [Op.eq]: login,
                        },
                    },
                });
                if (user) {
                    user.games++;
                    this["sessions"][login] = {};
                    await user.save();
                }
            }
        }
        this["sessions"][login]["gamerField"] = gamerField;
        this["sessions"][login]["gamerCages"] = gamerCages;
        this["sessions"][login]["pcCages"] = pcCages;
        this["sessions"][login]["pcField"] = pcField;
    }
    await res.json({ gamerField, pcField, isWin, isLose });
});

app.post("/finish", async (req, res) => {
    let { login } = req.body;
    if (this["sessions"] && this["sessions"][login] && this["sessions"][login]["gamerCages"]) {
        let user = await User.findOne({
            where: {
                login: {
                    [Op.eq]: login,
                },
            },
        });
        if (user) {
            user.games++;
            await user.save();
        }
        this["sessions"][login] = {};
        await user.save();
    }
    await res.json({ gamerField: getBlankField(), pcField: getBlankField() });
});

app.post("/finishFifteen", async (req, res) => {
    let { login } = req.body;
    let user = await User.findOne({
        where: {
            login: {
                [Op.eq]: login,
            },
        },
    });
    if (user) {
        user.fifteenGames++;
        user.fifteenRecord = (!user.fifteenRecord || user.fifteenRecord > req.body.moves) ? req.body.moves : user.fifteenRecord;
        user.fifteenMedium = user.fifteenMedium === 0 ? req.body.moves : (user.fifteenMedium + req.body.moves / 2);
        await user.save();
    }
    await user.save();
});

app.post("/finishMinesweeper", async (req, res) => {
    let { login, fieldSize, isWin } = req.body;
    let user = await User.findOne({
        where: {
            login: {
                [Op.eq]: login,
            },
        },
    });
    if (user) {
        if (fieldSize === 10) {
            user.mineEasy++;
            user.mineEasyWin = isWin ? user.mineEasyWin + 1 : user.mineEasyWin;
        } else if (fieldSize === 15) {
            user.mineNormal++;
            user.mineNormalWin = isWin ? user.mineNormalWin + 1 : user.mineNormalWin;
        } else if (fieldSize === 20) {
            user.mineHard++;
            user.mineHardWin = isWin ? user.mineHardWin + 1 : user.mineHardWin;
        }
        await user.save();
    }
    await user.save();
});

app.listen(port, () => {
    console.log(`Arcade games api listening on port ${port}`);
});
