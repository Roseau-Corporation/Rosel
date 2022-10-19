#!/usr/bin/env node

import { program as Program } from "commander"
import Package from "../../package.json"
import "./Commands"

Program
    .name("rosel")
    .description(Package.description)
    .option("-v, --version", "output the version number")
    .parse()