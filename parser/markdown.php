<?php
/**
 * Part of fongshen project. 
 *
 * @copyright  Copyright (C) 2008 - 2014 Asikart.com. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

include_once __DIR__ . '/../php/autoload.php';

$data = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';

echo \Michelf\MarkdownExtra::defaultTransform($data);
